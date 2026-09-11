import api from './axios'

export async function getCustomers(){
    const response = await api.get("/customers");
    return response.data.data;
}