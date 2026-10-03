from fastapi import FastAPI
from app.routes import customers , customers_group , customer_address
from app.routes import products , product_inventory , product_price
from fastapi.middleware.cors import CORSMiddleware

#sahir
#Jay
from app.routes import login

from app.routes import order_items,order_shipping
from app.routes import orders, order_transactions
from app.routes import discounts
#Deepika
from app.routes import stores
from app.routes import orders_billing   

def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(customers.router)
    app.include_router(customers_group.router)
    app.include_router(customer_address.router)
    #Orders-Sahir
    app.include_router(order_items.router)
    app.include_router(order_shipping.router)

    app.include_router(login.router)
    
    
    app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    
    

    #Orders2-Jayanth
    app.include_router(orders.router)
    app.include_router(order_transactions.router)
    # discounts-jhansi
    app.include_router(discounts.router)
    
    
    #Orders3-Pushpa
    app.include_router(orders_billing.router)
    
    #products-Vinay
    app.include_router(products.router)
    app.include_router(product_price.router)
    app.include_router(product_inventory.router)
    
    
    
    #Stores-Deepika
    app.include_router(stores.router)

    @app.get("/")
    def read_root():
        return {"message": "E-commerce API is running!"}

    return app

app = create_app()
