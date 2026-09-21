import { useState , useEffect } from "react";
import axios from 'axios'

import CustomerCard from "../components/CustomerCard"
import CardModal from "../components/CardModal";
import '../styles/Cards.css'



function Customers(){

        const [customers, setCustomers] = useState([]);
        const[error, setError] = useState(null);
    
        


        useEffect(() =>{
            const fetchCustomers = async () =>{
                try{
                    const response =  await axios.get("http://127.0.0.1:8000/customers");

                    setCustomers(response.data.data);

                }
                catch(error){
                    setError(error.message);
                }
            };fetchCustomers();
    },[] );

    
        if(error)
            return <p>Error : {error}</p>

    return(
        <div className="customers-container">
            <h1>Customers</h1>
            <div className="customers-grid">
                {
                customers.map((customer) =>(
                    <CustomerCard key = {customer.customer_id} customer = {customer} />
                ))
            }
            </div>

            <CardModal />
        </div>
    )
}


export default Customers