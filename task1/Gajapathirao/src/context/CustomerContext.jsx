import React, { createContext } from "react";

import useCustomers from "../hooks/useCustomer";


export const CustomerContext = createContext(null);


export default function CustomerProvider({ children }) {

    const customerData = useCustomers();

    return (
        <CustomerContext.Provider value={customerData}>
            {children}
        </CustomerContext.Provider>
    );
}