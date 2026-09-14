import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './prod.css'
import { UserContext } from './context'
import { useContext } from 'react'

function Card(props) {
    return<div className='product-card' key={props.prod_id}>
        <div className='img-con'>
        <img src={props.image_url} alt={props.image_title} />
        </div>
        <div>
        <h2>{props.name}</h2>
        <strong>{props.short_desc}</strong>
        <p>{props.description}</p>
        <span>{props.specifications.model}</span>
        <span>{props.specifications.color}</span>

        </div>

    </div>
    
    
}


const Products = () => {
    const {url} = useContext(UserContext)
   const [product, setProduct] = useState([])
    useEffect(()=> {
        axios.get(url+'products')
        .then((response) => {console.log(response); setProduct(response.data.data)})
        .catch((error) => {console.log(error)})
        .finally(() => {console.log('Request completed')})
    },[])
   return<>
     <div className='prod-container'>
        {product.map((prod) => (
            <Card {...prod} />
        ))}
     </div>
   </>
  
}

export default Products;
