import { useState , useEffect } from "react";
import axios from 'axios'

import OrderCard from "../components/OrderCard"
import CardModal from "../components/CardModal";

import '../styles/Cards.css'

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

        const updateOrder = async (orderId, data) => {
            try{
                await axios.patch(
                    `http://127.0.0.1:8000/orders/${orderId}`,
                    data
                );

                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_id === orderId
                            ? { ...order, ...data ,updated_at: new Date().toISOString()}
                            : order
                    )
                );

                return { success: true };
            }
            catch(error){
                return {
                    success: false,
                    message: error.response?.data?.error || "Failed to update order"
                };
            }
        };



        const deleteOrder = async (orderId) => {
            try {
                await axios.delete(`http://127.0.0.1:8000/orders/${orderId}`);

                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order.order_id !== orderId)
                );
            }
            catch(error){
                alert("Cannot delete this order because it is referenced by another record.");
                console.log(error);
            }
        };
            

    
        if(error)
            return <p>Error : {error}</p>

    return(
        <div className="orders-container">
            <h1>Orders</h1>
            <div className="orders-grid">
                {
                orders.map((order) =>(
                    <OrderCard key = {order.order_id} order = {order} onUpdate={updateOrder} onDelete={deleteOrder}/>
                ))
            }
            </div>

            <CardModal />
        </div>
    )
}


export default Orders