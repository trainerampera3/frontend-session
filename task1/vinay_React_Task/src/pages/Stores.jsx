import { useState , useEffect } from "react";
import axios from 'axios'

import StoreCard from "../components/StoreCard"

import '../styles/Products.css'


function Stores(){

        const [stores, setStores] = useState([]);
        const[error, setError] = useState(null);
    
        


        useEffect(() =>{
            const fetchStores = async () =>{
                try{
                    const response =  await axios.get("http://127.0.0.1:8000/stores");

                    setStores(response.data);
                }
                catch(error){
                    setError(error.message);
                }
            };fetchStores();
    },[] );

    
        if(error)
            return <p>Error : {error}</p>

    return(
        <div className="stores-container">
            <h1>Stores</h1>
            <div className="stores-grid">
                {
                stores.map((store) =>(
                    <StoreCard key = {store.store_id} store = {store} />
                ))
            }
            </div>
        </div>
    )
}


export default Stores