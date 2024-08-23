import json
import random
from datetime import datetime, timedelta

file_path = 'uit_member.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

locations = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
             'Q11', 'Q12', 'Tân Bình', 'Bình Tân', 'Bình Thạnh', 'Thủ Đức']

def generate_random_date():
    start_date = datetime(2024, 8, 30)
    end_date = datetime(2024, 12, 31)
    random_days = random.randint(0, (end_date - start_date).days)
    return start_date + timedelta(days=random_days)


def generate_unique_number(existing_numbers):
    while True:
        number = ''.join(random.choices('0123456789', k=12))
        if number not in existing_numbers:
            existing_numbers.add(number)
            return number


# Set to keep track of unique numbers
existing_numbers = set()

with open('output.txt', 'w', encoding='utf-8') as output_file:
    for member in data:
        random_number = random.choice([0, 3, 6])
        full_name = member.get('full_name')
        unique_number = generate_unique_number(existing_numbers)
        location = random.choice(locations)
        random_date = generate_random_date().strftime('%Y-%m-%d')
        amount = random.randint(100001, 1000000)

        sql_command = f"CALL MOSOTIETKIEM({random_number}, '{full_name}', '{
            unique_number}', '{location}', '{random_date}', {amount});\n"
        output_file.write(sql_command)

print("SQL commands have been written to output.txt.")
