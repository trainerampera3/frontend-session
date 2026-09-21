import os
import psycopg

def get_connection():
    return psycopg.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5433"),
        dbname=os.getenv("DB_NAME", "destinations_db"),
        user=os.getenv("DB_USER", "pushpa"),
        password=os.getenv("DB_PASSWORD", "pushpa")
    )