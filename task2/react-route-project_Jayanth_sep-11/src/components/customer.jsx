import React from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useContext } from "react";
import { UserContext } from "./context";
import './customer.css'

function Card(props){
   return <div className='cust-container' key={props.customer_id}>
        <div className='cust-image-card'><img src="/home/jayanthkumar/Downloads/profile1.jpeg" alt={props.name}/></div>
        <h2>{props.name}</h2>
        <div className='cust-info'>
            <p><span>Phone :</span>{props.phone}</p>
            <p><span>Email :</span>{props.email}</p>
            <span>{props.customer_group_id}</span>
        </div>
    </div>
}





const Customers = () => {
    const {url} = useContext(UserContext)
   const [cust, setCust] = useState([])
    useEffect(()=> {
        axios.get(url+'customers')
        .then((response) => {console.log(response); setCust(response.data.data)})
        .catch((error) => {console.log(error)})
        .finally(() => {console.log('Request completed')})
    },[])
   return<>
   <div className="main-container">
   {cust.map((item)=>(
    <Card {...item} key={item.customer_id} />
   )) }
   </div>
   </>
  
}

export default Customers;