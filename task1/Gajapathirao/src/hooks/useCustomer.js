import {
    useEffect,
    useState
} from "react";

import {
    getCustomers,
    getCustomer as getCustomerApi,
    updateCustomer as updateCustomerApi,
    deleteCustomer as deleteCustomerApi
} from "../services/customerApi";


export default function useCustomers() {

    const [customers, setCustomers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    async function loadCustomers() {

        try {

            setLoading(true);
            setError("");

            const data = await getCustomers();

            setCustomers(data);

        } catch (error) {

            console.log(error);

            setError(
                "Failed to load customers"
            );

        } finally {

            setLoading(false);

        }
    }


    async function getCustomer(customerId) {

        try {

            setError("");

            const customer =
                await getCustomerApi(customerId);

            return customer;

        } catch (error) {

            console.log(error);

            setError(
                "Failed to load customer"
            );

            throw error;

        }
    }


    async function updateCustomer(
        customerId,
        customerData
    ) {

        try {

            setError("");

            const updatedCustomer =
                await updateCustomerApi(
                    customerId,
                    customerData
                );


            setCustomers(prevCustomers =>

                prevCustomers.map(customer =>

                    customer.customer_id ===
                    Number(customerId)

                        ? {
                            ...customer,
                            ...customerData
                        }

                        : customer

                )

            );


            return updatedCustomer;

        } catch (error) {

            console.log(error);

            setError(
                "Failed to update customer"
            );

            throw error;

        }
    }


    async function deleteCustomer(
        customerId
    ) {

        try {

            setError("");

            await deleteCustomerApi(
                customerId
            );


            setCustomers(prevCustomers =>

                prevCustomers.filter(
                    customer =>
                        customer.customer_id !==
                        customerId
                )

            );

        } catch (error) {

            console.log(error);

            setError(
                "Failed to delete customer"
            );

            throw error;

        }
    }


    useEffect(() => {

        loadCustomers();

    }, []);


    return {

        customers,

        loading,

        error,

        loadCustomers,

        getCustomer,

        updateCustomer,

        deleteCustomer

    };
}