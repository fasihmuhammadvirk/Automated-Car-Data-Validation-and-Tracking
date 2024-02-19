
from connection import Session,engine

local_session = Session(bind = engine)

csv_file_path = './vechile data.csv'  

with open(csv_file_path, 'r') as file:
    csv_reader = csv.DictReader(file)

    for row in csv_reader:
        # Create a new Record object with data from the CSV row
        record = Record(
            owner_name=row['owner_name'],
            owner_father_name=row['owner_father_name'],
            owner_city=row['owner_city'],
            owner_cnic=row['owner_cnic'],
            owner_tax_paid=bool(row['owner_tax_paid']),
            number_plate=row['number_plate'],
            engine_number=row['engine_number'],
            make_name=row['make_name'],
            register_date= row['register_date'], 
            year_of_manufacture=int(row['year_of_manufacture']),
            vehicle_price=int(row['vehicle_price']),
            color=row['color'],
            token=row['token'],
            is_stolen=bool(row['is_stolen'])
        )

        # Add the record to the session
        local_session.add(record)


# Commit the changes to the database
local_session.commit()