import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/axios";


function StoreCard({ store, showCard }) 
{ 
    return ( 
        <div className="store-card"  onClick={() => showCard(store)}> 
            <div className="store-top"> 
                <div className="store-icon"> 🏪 </div>
                <span className="store-status" style={{backgroundColor:store.status === 'inactive'?"firebrick":""}}> {store.status} </span>
            </div> 
            <h2>{store.name}</h2>
            <p className="store-description"> {store.description} </p>
            <div className="store-info">
                <p>📍 {store.location}</p> 
                <p>✉️ {store.email}</p> 
                <p>📞 {store.phone}</p> 
            </div>
        </div> 
        ); 
}


export default function Stores(){
    const [data, setData] = useState([])
    const [selectedStore, setSelectedStore] = useState(null)
    const [products, setProdcuts] = useState([])

    const handleClick = async (store) => {
        setSelectedStore(store)
        console.log(store)
        
        const response = await api.get(`/stores/${store.store_id}/products`,{withCredentials:true})

        const data = response.data
        console.log("inside the function "+data)

        setProdcuts(data)
    }


    useEffect(()=>{
        api.get("/stores", {withCredentials:true})
        .then((res) => {setData(res.data)})
        .catch((error) =>{`Error:${error}`})
},[])

    return<>
    <div className="store">
     {data.map((store) =>(
        <StoreCard key={store.store_id} store={store} showCard={handleClick} />
     ))}
     </div>
     {selectedStore && <div className="products-container">
        <div className="prods-con">
        
          <h2> Products in {selectedStore.name} </h2>

          {products.map((product) => (
            <div key={product.prod_id} >
                <h3> {product.product_name}</h3>
                <p>Desc: {product.description}</p>


                
          </div>))}
          {<button onClick={()=> {setSelectedStore(null)}}>Close</button>}
          </div>
        </div>}
    </>
}