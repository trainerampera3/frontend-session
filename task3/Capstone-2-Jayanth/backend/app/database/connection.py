import psycopg as pg
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    try:
        return pg.connect(
            host=os.getenv('DB_HOST'),
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            port=os.getenv('DB_PORT'),
            password=os.getenv('DB_PASS')
        )
    except Exception as e:
        print(f'Connection error:{e}')
        return 'Error'