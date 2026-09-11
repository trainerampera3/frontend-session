import React from "react";
import { useNavigate } from "react-router";

import "../styles/CustomerCard.scss";

export default function CustomerCard({
    customer,
    onDelete
}) {

    const navigate = useNavigate();


    function handleEdit() {

        navigate(
            `/customers/${customer.customer_id}/edit`
        );

    }


    function handleView() {

        navigate(
            `/customers/${customer.customer_id}`
        );

    }


    function handleDelete() {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${customer.name}?`
        );

        if (confirmed) {

            onDelete(customer.customer_id);

        }

    }


    return (

        <div className="customer-card">

            <h2>
                {customer.name}
            </h2>


            <p>
                <strong>Email:</strong>{" "}
                {customer.email}
            </p>


            <p>
                <strong>Phone:</strong>{" "}
                {customer.phone}
            </p>


            <p>
                <strong>Gender:</strong>{" "}
                {customer.gender}
            </p>


            <p>
                <strong>Status:</strong>{" "}
                {customer.status}
            </p>


            <div className="card-actions">

                <button
                    className="view-btn"
                    onClick={handleView}
                >
                    View
                </button>


                <button
                    className="edit-btn"
                    onClick={handleEdit}
                >
                    Edit
                </button>


                <button
                    className="delete-btn"
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

        </div>

    );
}