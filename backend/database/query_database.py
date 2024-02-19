from connection import Session,engine
from car_record_model import Record

local_session = Session(bind = engine)


car_records = local_session.query(Record).all()


print("{:<15} {:<20} {:<0}".format("Number Plate", "Owner Name", "Car Company"))
for record in car_records:
    print("{:<15} {:<20} {:<0}".format(record.number_plate, record.owner_name, record.make_name))
