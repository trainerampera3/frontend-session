import React  , {useContext}from "react";

import CustomerCard from "./CustomerCard.jsx";
// import useCustomers from "../hooks/useCustomer.js";

import { CustomerContext } from "../context/CustomerContext";

import "../styles/kpiCards.scss";


export default function KPICards() {

const { customers, loading, error, deleteCustomer } = useContext(CustomerContext);


    console.log("customers:", customers);
    console.log("loading:", loading);
    console.log("error:", error);


    if (loading) {
        return <h2>Loading customers...</h2>;
    }


    if (error) {
        return <h2>Error: {error}</h2>;
    }


    return (
        <div className="customers">

            <h1>Customers</h1>

            <p>
                Number of customers: {customers.length}
            </p>

            <div className="cards">

                {customers.map(customer => (

                    <CustomerCard
                        key={customer.customer_id}
                        customer={customer}
                        onDelete={deleteCustomer}
                    />

                ))}

            </div>

        </div>
    );
}