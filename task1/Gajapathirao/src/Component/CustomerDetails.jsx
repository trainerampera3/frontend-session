import React, {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useParams,
    useNavigate
} from "react-router";

import {
    CustomerContext
} from "../context/CustomerContext";


export default function CustomerDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    const {
        getCustomer
    } = useContext(CustomerContext);


    const [customer, setCustomer] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadCustomer() {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getCustomer(id);


                setCustomer(data);

            }
            catch (error) {

                console.log(error);

                setError(
                    "Failed to load customer"
                );

            }
            finally {

                setLoading(false);

            }

        }


        loadCustomer();

    }, [id]);


    if (loading) {

        return (
            <div>
                Loading customer...
            </div>
        );

    }


    if (error) {

        return (
            <div>
                {error}
            </div>
        );

    }


    if (!customer) {

        return (
            <div>
                Customer not found
            </div>
        );

    }


    return (

        <div className="customer-details">

            <h1>
                Customer Details
            </h1>


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
                <strong>Customer Group:</strong>{" "}
                {customer.customer_group_id}
            </p>


            <p>
                <strong>Status:</strong>{" "}
                {customer.status}
            </p>


            <button
                onClick={() =>
                    navigate(
                        `/customers/${customer.customer_id}/edit`
                    )
                }
            >
                Edit
            </button>


            <button
                onClick={() =>
                    navigate("/customers")
                }
            >
                Back
            </button>

        </div>

    );
}