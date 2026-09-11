import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/customerApi.js';

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
          /> ))}
      </div>
      </div>
    </>
  );
}
