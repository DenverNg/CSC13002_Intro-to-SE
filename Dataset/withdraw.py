import re
from datetime import datetime, timedelta
import random

def random_withdraw_amount(balance):
    """Generate a random withdraw amount up to the account balance."""
    return round(random.uniform(0, balance) / 1000) * 1000

def generate_withdraw_commands(file_path):
    withdraw_commands = []

    # Regex pattern to extract ma_so, ky_han, ngay_mo, and so_tien
    pattern = re.compile(
        r"CALL MOSOTIETKIEM\('([^']*)',\s*'([^']*)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'([^']*)',\s*(\d+)\);", re.IGNORECASE)

    accounts = []  # To store the first 300 account information

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            match = pattern.search(line)
            if match:
                ma_so = match.group(1)
                ky_han = match.group(2)
                ngay_mo = datetime.strptime(match.group(3), '%Y-%m-%d')
                balance = int(match.group(4))

                # Collect first 300 accounts
                if len(accounts) < 300:
                    accounts.append((ma_so, ky_han, ngay_mo, balance))

    # Randomly select 50 unique accounts from the first 300
    selected_accounts = random.sample(accounts, 70)

    for ma_so, ky_han, ngay_mo, balance in selected_accounts:
        if ky_han == 'Không kỳ hạn':
            # Withdrawals allowed 15 days after opening
            withdraw_date_start = ngay_mo + timedelta(days=16)
            withdraw_date_end = datetime(2024, 12, 31)  # Arbitrary end date
            if withdraw_date_start <= withdraw_date_end:
                withdraw_date = random_date(withdraw_date_start, withdraw_date_end).strftime('%Y-%m-%d')
                withdraw_amount = random_withdraw_amount(balance)
                withdraw_commands.append(f"CALL LAPPHIEURUT('{ma_so}', '{withdraw_date}', {withdraw_amount});\n")

        elif ky_han == 'Kỳ hạn 3 tháng':
            # Withdraw only exactly at 3 months after opening (30 * 3 days)
            three_months_date = ngay_mo + timedelta(days=32 * 3)
            if three_months_date <= datetime(2024, 12, 31):
                withdraw_commands.append(f"CALL LAPPHIEURUT('{ma_so}', '{three_months_date.strftime('%Y-%m-%d')}', {balance});\n")

        elif ky_han == 'Kỳ hạn 6 tháng':
            # Withdraw allowed exactly at 6 months after opening
            six_months_date = ngay_mo + timedelta(days=6 * 32)
            if six_months_date <= datetime(2024, 12, 31):
                withdraw_commands.append(f"CALL LAPPHIEURUT('{ma_so}', '{six_months_date.strftime('%Y-%m-%d')}', {balance});\n")

    return withdraw_commands

def random_date(start_date, end_date):
    """Generate a random date between start_date and end_date."""
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

# Generate withdraw commands
file_path = 'createBook.txt'
commands = generate_withdraw_commands(file_path)

# Write the commands to a new file
with open('withdraw.txt', 'w', encoding='utf-8') as output_file:
    output_file.writelines(commands)

print("SQL commands have been written to withdraw.txt.")
