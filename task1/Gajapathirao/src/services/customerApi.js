import api from './axios';


export async function getCustomers() {

    const response = await api.get("/customers");

    return response.data.data;
}


export async function updateCustomer(customerId, customerData) {

    const response = await api.put(
        `/customers/${customerId}`,
        customerData
    );

    return response.data;
}


export async function deleteCustomer(customerId) {

    const response = await api.delete(
        `/customers/${customerId}`
    );

    return response.data;
}