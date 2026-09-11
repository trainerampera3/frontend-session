import React from "react";

import {
    useNavigate
} from "react-router";


export default function NotFound() {

    const navigate = useNavigate();


    return (

        <div>

            <h1>
                404
            </h1>

            <h2>
                Page Not Found
            </h2>

            <button
                onClick={() =>
                    navigate("/customers")
                }
            >
                Go to Customers
            </button>

        </div>

    );
}