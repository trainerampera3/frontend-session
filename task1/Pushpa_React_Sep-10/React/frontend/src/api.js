const API_URL = "http://127.0.0.1:8000";

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`);

    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    return response.json();
}
 
export async function getcustomer_address(){
    const response=await fetch (`${API_URL}/customer_address`);
    
    if(!response.ok){
        throw new Error("Failed to fetch customer_address");
    }
    return response.json();

}