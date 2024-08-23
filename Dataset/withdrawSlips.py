import random
from datetime import datetime, timedelta

# Read the first 200 lines from the 'createBook.txt' file
file_path = 'createBook.txt'
with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()[:200]

# Select every 5th line from the first 200 lines
selected_lines = lines[::5]

# Function to add a random number of days greater than a specified minimum to a given date
def add_random_days_to_date(date_str, min_days):
    date = datetime.strptime(date_str, '%Y-%m-%d')
    days_to_add = random.randint(min_days, min_days + 15)  # Ensure it's at least min_days
    new_date = date + timedelta(days=days_to_add)
    return new_date.strftime('%Y-%m-%d')

# Open the output file for writing withdrawal slip SQL commands
with open('withdrawalSlips.txt', 'w', encoding='utf-8') as output_file:
    for line in selected_lines:
        # Extract the account type, date, and balance from each line
        parts = line.split(',')
        account_type = int(parts[0].split('(')[1].strip())
        full_name = parts[1].strip().strip("'")
        account_number = parts[2].strip().strip("'")
        account_location = parts[3].strip().strip("'")
        account_date = parts[4].strip().strip("'")
        balance = int(parts[5].strip().strip(');'))
        
        # Generate the MS number based on the line's index
        ms_number = f"MS{lines.index(line):06}"

        # For account type 0
        if account_type == 0:
            # Generate a new date by adding a random number of days greater than or equal to 15
            withdrawal_date = add_random_days_to_date(account_date, 15)
            
            # Withdraw a random amount less than the balance
            withdrawal_amount = random.randint(1, balance - 1)
            withdrawal_amount = round(withdrawal_amount, -3)
        # For account types 3 and 6
        else:
            # Generate a new date by adding days greater than or equal to account_type * 30
            min_days = account_type * 31
            withdrawal_date = add_random_days_to_date(account_date, min_days)
            
            # Withdraw the entire balance
            withdrawal_amount = balance

        # Round the withdrawal amount to the nearest thousand
       

        # Generate the SQL command for the withdrawal slip
        sql_command = f"CALL LAPPHIEURUT('{ms_number}', '{withdrawal_date}', {withdrawal_amount});\n"
        
        # Write the SQL command to the file
        output_file.write(sql_command)

print("Withdrawal slip SQL commands have been written to withdrawalSlips.txt.")
