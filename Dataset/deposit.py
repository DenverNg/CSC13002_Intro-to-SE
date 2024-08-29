import re
import random
from datetime import datetime, timedelta

# Function to generate a random date between start_date and end_date


def random_date(start_date, end_date):
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

# Function to generate a random deposit amount rounded to the nearest thousand


def random_deposit_amount(min_amount, max_amount):
    return round(random.uniform(min_amount, max_amount) / 1000) * 1000

# Read data from the file and generate SQL commands


def generate_sql_commands(file_path):
    start_date = datetime(2024, 8, 20)
    end_date = datetime(2024, 9, 5)
    max_lines = 300  # Limit to the first 300 lines

    sql_commands = []
    line_count = 0

    # Regex pattern to extract ma_so and ky_han
    pattern = re.compile(
        r"CALL MOSOTIETKIEM\('([^']*)',\s*'([^']*)'", re.IGNORECASE)

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            if line_count >= max_lines:
                break

            match = pattern.search(line)
            if match:
                ma_so = match.group(1)
                ky_han = match.group(2)

                if ky_han == 'Không kỳ hạn':
                    deposit_date = random_date(
                        start_date, end_date).strftime('%Y-%m-%d')
                    deposit_amount = random_deposit_amount(100000, 10000000)

                    sql_command = f"CALL LAPPHIEUGUI('{ma_so}', '{deposit_date}', {
                        deposit_amount});\n"
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
