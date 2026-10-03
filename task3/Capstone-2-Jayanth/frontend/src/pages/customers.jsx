import api from "../components/axios";
import React , {useEffect, useState} from "react";
import EditModal from "../components/editModal";
import { toast } from "react-toastify";


const CustCard = (props) => {
     return <>
     <div className="cust-container">
         <div className="profile">
            <span className="cust-status" key={props.items.status}  style={{backgroundColor:props.items.status==="active" ? 'burlywood':"#606c38"}}>{props.items.status}</span>
         </div>
         <div className="cust-info">
            <h4 className="name" key={props.items.name}>{props.items.name}</h4>
            <div className="contact">
                <p key={props.items.email}><b>Email</b>: {props.items.email}</p>
                <p key={props.items.phone}><b>phone</b>: {props.items.phone}</p>
            </div>
            <div className="extra-info">
                <span key={props.items.gender} style={{backgroundColor:props.items.gender==="Male" ? '#e76f51':"#ffafcc"}}>{props.items.gender}</span>
                 <button className="buts" onClick={() => props.onEdit(props.items)}>Edit</button>
            </div>
         </div>
        </div></>
}


export default function Customers(){
    const [data, setData] = useState([])
    const [editingCustomer, setEditingCustomer] = useState(null)
    const customerFields = [
        'name',
        'email',
        'phone',
        'status',
        'gender'
    ]
    useEffect(()=> {
        api.get('/customers', {withCredentials:true})
        .then((res)=>{setData(res.data.data); console.log(res.data.data)})
        .catch((error)=> {
            return `error ${error}`
        })
    },[])

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
    };

    const handleSave = async (updatedCustomer) => {

        try {

            const response = await api.put(
                `/customers/${updatedCustomer.customer_id}`,
                updatedCustomer,
                {withCredentials:true}
            );
            
                
            


            setData((prevCustomers) =>
                prevCustomers.map((customer) =>
                customer.customer_id === updatedCustomer.customer_id ? { ...customer, ...updatedCustomer } : customer)
            );

            toast.success('Successfully updated')

            setEditingCustomer(null);

        } catch (error) {

            console.log("Update failed:", error);
            toast.error('Not updated successfullt'+`error ${error} `)

        }
    };


    return <>
    <div className="cust">
      {data.map((item)=>(
        <CustCard key={item.customer_id} items={item} onEdit={handleEdit}/>
      ))}
    </div>
     {editingCustomer && (
                <EditModal
                    data={editingCustomer}
                    fields={customerFields}
                    onSave={handleSave}
                    onClose={() => setEditingCustomer(null)}
                />
            )}

    </>
}