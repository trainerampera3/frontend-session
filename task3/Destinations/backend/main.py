from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from connection import get_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/destinations")
def get_destinations():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM destinations1")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows


@app.get("/destinations/{id}")
def get_destination(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM destinations1 WHERE id = %s",
        (id,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    return row


@app.post("/destinations1")
def create_destination(
    name: str,
    country: str,
    category: str,
    description: str,
    best_time: str,
    average_cost: float,
    image_url: str
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO destinations
        (name, country, category, description, best_time, average_cost, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (
            name,
            country,
            category,
            description,
            best_time,
            average_cost,
            image_url
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Destination created successfully"}