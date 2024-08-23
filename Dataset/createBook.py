import json
import random
from datetime import datetime, timedelta

file_path = 'name.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

locations = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7',
             'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Phú Nhuận',
             'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức', 'Huyện Bình Chánh', 'Huyện Cần Giờ', 'Huyện Củ Chi',
             'Huyện Hóc Môn', 'Huyện Nhà Bè', 'Huyện Bình Tân','227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM',]

def generate_random_date(month):
    """Generate a random date within the specified month of 2024."""
    if month == 2:
        start_date = datetime(2024, 2, 1)
        end_date = datetime(2024, 2, 29)  # February in 2024 has 29 days (leap year)
    elif month == 5:
        start_date = datetime(2024, 5, 1)
        end_date = datetime(2024, 5, 31)
    elif month == 8:
        start_date = datetime(2024, 8, 1)
        end_date = datetime(2024, 8, 31)
    else:
        raise ValueError("Only months 2, 5, and 8 are supported.")

    random_days = random.randint(0, (end_date - start_date).days)
    return start_date + timedelta(days=random_days)

def generate_unique_number(existing_numbers):
    """Generate a unique 12-digit number."""
    while True:
        number = ''.join(random.choices('0123456789', k=12))
        if number not in existing_numbers:
            existing_numbers.add(number)
            return number

# Set to keep track of unique numbers
existing_numbers = set()

with open('createBook.txt', 'w', encoding='utf-8') as output_file:
    for i, member in enumerate(data):
        # Cycle through the months 2, 5, 8 in each block of 200 accounts
        if i % 200 < 67:  # First ~1/3 of 200 accounts
            month = 2
        elif i % 200 < 134:  # Second ~1/3 of 200 accounts
            month = 5
        else:  # Last ~1/3 of 200 accounts
            month = 8

        # Alternate between 0, 3, 6 in sequence
        random_number = [0, 3, 6][i % 3]
        
        full_name = member.get('full_name')
        unique_number = generate_unique_number(existing_numbers)
        location = random.choice(locations)
        random_date = generate_random_date(month).strftime('%Y-%m-%d')
        amount = random.randint(100001, 2000000)
        amount = round(amount, -3)

        sql_command = f"CALL MOSOTIETKIEM({random_number}, '{full_name}', '{unique_number}', '{location}', '{random_date}', {amount});\n"
        output_file.write(sql_command)

print("SQL commands have been written to createBook.txt.")
