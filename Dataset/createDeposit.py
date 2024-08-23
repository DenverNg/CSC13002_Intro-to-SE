import random
from datetime import datetime, timedelta

# Read the first 200 lines from the 'createBook.txt' file
file_path = 'createBook.txt'
with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()[:200]

# Function to add a random number of days greater than 15 to a given date


def add_random_days_to_date(date_str):
    date = datetime.strptime(date_str, '%Y-%m-%d')
    # Random number between 16 and 30 days
    days_to_add = random.randint(16, 30)
    new_date = date + timedelta(days=days_to_add)
    return new_date.strftime('%Y-%m-%d')


# Counter for generating unique deposit slip numbers
deposit_number = 0

# Open the output file for writing deposit slip SQL commands
with open('depositSlips.txt', 'w', encoding='utf-8') as output_file:
    for line_number, line in enumerate(lines):
        # Extract the account type and date from each line
        parts = line.split(',')
        account_type = parts[0].split('(')[1].strip()
        account_date = parts[-2].strip().strip("'")

        # Check if the account type is '0'
        if account_type == '0':
            # Generate a deposit slip number corresponding to the line number (MS sequence)
            deposit_slip_number = f'MS{line_number:06}'

            # Generate a new date by adding a random number of days greater than 15
            deposit_date = add_random_days_to_date(account_date)

            # Generate a random deposit amount, ensuring it's greater than 100000
            deposit_amount = random.randint(100001, 1000000)

            # Generate the SQL command for the deposit slip
            sql_command = f"CALL LAPPHIEUGUI('{deposit_slip_number}', '{
                deposit_date}', {deposit_amount});\n"

            # Write the SQL command to the file
            output_file.write(sql_command)

            # Increment the deposit slip number for the next entry
            deposit_number += 1

print("Deposit slip SQL commands have been written to depositSlips.txt.")
