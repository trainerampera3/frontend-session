import { useState , useEffect } from "react";
import axios from 'axios'

import OrderCard from "../components/OrderCard"
import CardModal from "../components/CardModal";

import '../styles/Products.css'

function Orders(){

        const [orders, setOrders] = useState([]);
        const[error, setError] = useState(null);
    
        


        useEffect(() =>{
            const fetchOrders
             = async () =>{
                try{
                    const response =  await axios.get("http://127.0.0.1:8000/orders");

                    setOrders(response.data);
                }
                catch(error){
                    setError(error.message);
                }
            };fetchOrders
            ();
    },[] );

    
        if(error)
            return <p>Error : {error}</p>

    return(
        <div className="orders-container">
            <h1>Orders</h1>
            <div className="orders-grid">
                {
                orders.map((order) =>(
                    <OrderCard key = {order.order_id} order = {order} />
                ))
            }
            </div>

            <CardModal />
        </div>
    )
}


export default Orders