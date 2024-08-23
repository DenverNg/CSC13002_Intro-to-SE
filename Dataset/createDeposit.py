import random
from datetime import datetime, timedelta

# Read the first 200 lines from the 'createBook.txt' file
file_path = 'createBook.txt'
with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()[:200]

# Function to generate a random date within August or September 2024


def get_random_date_aug_sept():
    # Define start and end dates for August and September 2024
    start_date = datetime(2024, 8, 15)
    end_date = datetime(2024, 9, 4)
    # Calculate a random number of days to add within the range of August and September
    random_days = random.randint(0, (end_date - start_date).days)
    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime('%Y-%m-%d')


# Counter for generating unique deposit slip numbers
deposit_number = 0

# Open the output file for writing deposit slip SQL commands
with open('depositSlips.txt', 'w', encoding='utf-8') as output_file:
    for line_number, line in enumerate(lines):
        # Extract the account type from each line
        parts = line.split(',')
        account_type = parts[0].split('(')[1].strip()

        # Check if the account type is '0'
        if account_type == '0':
            # Generate a deposit slip number corresponding to the line number (MS sequence)
            deposit_slip_number = f'MS{line_number:06}'

            # Generate a random date in August or September
            deposit_date = get_random_date_aug_sept()

            # Generate a random deposit amount, ensuring it's greater than 100000
            deposit_amount = random.randint(100001, 1000000)
            deposit_amount = round(deposit_amount, -3)

            # Generate the SQL command for the deposit slip
            sql_command = f"CALL LAPPHIEUGUI('{deposit_slip_number}', '{
                deposit_date}', {deposit_amount});\n"

            # Write the SQL command to the file
            output_file.write(sql_command)

            # Increment the deposit slip number for the next entry
            deposit_number += 1

print("Deposit slip SQL commands have been written to depositSlips.txt.")
