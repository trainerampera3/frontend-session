import React, { useEffect, useState } from 'react';
import { getCustomers ,  updateCustomer,
    deleteCustomer } from '../services/customerApi.js';

import CustomerCard from './CustomerCard.jsx';

import '../styles/kpiCards.scss'


export default function KPICards() {
  const [customers, setCustomers] = useState([]);
const [loading , setLoading] = useState(true);
const [error , setError]=useState("");


useEffect(()=>{
  async function loadCustomers(){
    try{
      const data = await getCustomers();
      setCustomers(data)
    }
    catch(error){
      console.log(error);
      setError("Failed to load the Customers")
    }
    finally{
      setLoading(false)
    }
  }

  loadCustomers();

},[])

async function handleDelete(customerId) {

    try {

        await deleteCustomer(customerId);

        setCustomers(prevCustomers =>
            prevCustomers.filter(
                customer => customer.customer_id !== customerId
            )
        );

    } catch (error) {

        console.log(error);
        setError("Failed to delete customer");

    }
}


  async function handleUpdate(customerId, customerData) {

    try {

        await updateCustomer(customerId, customerData);

        setCustomers(prevCustomers =>
            prevCustomers.map(customer =>
                customer.customer_id === customerId
                    ? {
                        ...customer,
                        ...customerData
                    }
                    : customer
            )
        );

    } catch (error) {

        console.log(error);
        setError("Failed to update customer");

    }
}
  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="customers">
        <h1>Customers</h1>
      <div className="cards">
        {customers.map(customer => 
          ( <CustomerCard
    key={customer.customer_id}
    customer={customer}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
/> ))}
      </div>
      </div>
    </>
  );
}
