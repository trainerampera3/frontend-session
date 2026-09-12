import { useState , useEffect } from "react";
import axios from 'axios'

import ProductCard from "../components/ProductCard";
import '../styles/Products.css'
function Products(){

    const [products, setProducts] = useState([]);
    const[error, setError] = useState(null);

    // useEffect(() =>{
    //         const fetchProducts = async () =>{
    //             try{
    //                 console.log("1.")
    //                 const response =  await fetch("http://127.0.0.1:8000/products");
    //                 console.log("2.")
    //                 if(!response.ok)
    //                     throw new Error("Error in fetching the products data...");
    //                 console.log("3.")
    //                 const result = await response.json()
    //                 console.log(result)
    //                 setProducts(result.data);
    //                 console.log("5.")
    //             }
    //             catch(error){
    //                 setError(error.message);
    //             }
    //         };fetchProducts();
    // },[] );


    useEffect(() =>{
            const fetchProducts = async () =>{
                try{
                    console.log("1.")
                    const response =  await axios.get("http://127.0.0.1:8000/products");
                    console.log("2.")

                    setProducts(response.data.data);

                    
                    console.log(response)
                    console.log(response.data)
                    console.log(response.data.data)
                    console.log("5.")
                }
                catch(error){
                    setError(error.message);
                }
            };fetchProducts();
    },[] );

    if(error)
        return <p>Error : {error}</p>

    return(
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {
                products.map((product) =>(
                    <ProductCard key = {product.prod_id} product = {product} />
                ))
            }
            </div>
        </div>
    );
}

export default Products