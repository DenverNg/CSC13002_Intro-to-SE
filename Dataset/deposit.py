import re
import random
from datetime import datetime, timedelta

def random_date(start_date, end_date):
    """Generate a random date between start_date and end_date."""
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

def random_deposit_amount(min_amount, max_amount):
    """Generate a random deposit amount rounded to the nearest thousand."""
    return round(random.uniform(min_amount, max_amount) / 1000) * 1000

def generate_sql_commands(file_path, max_deposits_per_account=3):
    max_lines = 100  # Limit to the first 300 lines

    sql_commands = []
    line_count = 0

    # Regex pattern to extract ma_so, ky_han, and ngay_mo
    pattern = re.compile(
        r"CALL MOSOTIETKIEM\('([^']*)',\s*'([^']*)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'([^']*)'", re.IGNORECASE)

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            if line_count >= max_lines:
                break

            match = pattern.search(line)
            if match:
                ma_so = match.group(1)
                ky_han = match.group(2)
                ngay_mo = datetime.strptime(match.group(3), '%Y-%m-%d')

                if ky_han == 'Không kỳ hạn':
                    # Generate multiple deposits for the same account
                    for _ in range(random.randint(1, max_deposits_per_account)):
                        # Deposit date must be after the account opening date
                        start_date = ngay_mo + timedelta(days=1)
                        end_date = datetime(2024, 9, 6)  # Last possible deposit date
                        if start_date > end_date:
                            continue  # Skip if no valid date range for deposit

                        deposit_date = random_date(start_date, end_date).strftime('%Y-%m-%d')
                        deposit_amount = random_deposit_amount(100000, 1000000)

                        sql_command = f"CALL LAPPHIEUGUI('{ma_so}', '{deposit_date}', {deposit_amount});\n"
                        sql_commands.append(sql_command)

            line_count += 1

    return sql_commands

# Generate SQL commands
file_path = 'createBook.txt'
commands = generate_sql_commands(file_path)

# Write the commands to a new file
with open('deposit.txt', 'w', encoding='utf-8') as output_file:
    output_file.writelines(commands)

print("SQL commands have been written to deposit.txt.")
