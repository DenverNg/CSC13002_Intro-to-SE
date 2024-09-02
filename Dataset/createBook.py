import json
import random
from datetime import datetime, timedelta

file_path = 'name.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

locations = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7',
             'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Phú Nhuận',
             'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức', 'Huyện Bình Chánh', 'Huyện Cần Giờ', 'Huyện Củ Chi',
             'Huyện Hóc Môn', 'Huyện Nhà Bè', 'Huyện Bình Tân', '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM']

ky_han_options = ["Không kỳ hạn", "Kỳ hạn 3 tháng", "Kỳ hạn 6 tháng"]


def generate_random_date(ky_han):
    """Generate a random date based on the `ky_han` option."""
    if ky_han == "Không kỳ hạn":
        start_date = datetime(2024, 8, 15)
        end_date = datetime(2024, 9, 5)
    elif ky_han == "Kỳ hạn 3 tháng":
        # Either February or May 2024
        month = random.choice([2, 5])
        start_date = datetime(2024, month, 1)
        end_date = datetime(2024, month, 29 if month == 2 else 31)
    elif ky_han == "Kỳ hạn 6 tháng":
        # Either February or March 2024
        month = random.choice([2, 3])
        start_date = datetime(2024, month, 1)
        end_date = datetime(2024, month, 29 if month == 2 else 31)
    else:
        raise ValueError("Invalid `ky_han` option.")

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
        # Alternate between the options for `ky_han`
        ky_han = random.choice(ky_han_options)

        full_name = member.get('full_name')
        unique_number = generate_unique_number(existing_numbers)
        location = random.choice(locations)
        random_date = generate_random_date(ky_han).strftime('%Y-%m-%d')
        amount = random.randint(100001, 2000000)
        amount = round(amount, -3)

        # Create the `Mã Sổ` identifier
        ma_so = f"MS{i:06}"  # `i` formatted as a zero-padded 6-digit number

        # Include `Mã Sổ` in the SQL command
        sql_command = f"CALL MOSOTIETKIEM('{ma_so}', '{ky_han}', '{full_name}', '{
            unique_number}', '{location}', '{random_date}', {amount});\n"
        output_file.write(sql_command)

print("SQL commands have been written to createBook.txt.")
