import React from "react";

import '../styles/CustomerCard.scss'

export default function CustomerCard({ customer }) {
    return (
        <div className="customer-card">
            <h2>{customer.name}</h2>

            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.gender}</p>
            <p>{customer.status}</p>
        </div>
    );
}
