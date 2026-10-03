import { useState,useEffect } from "react";
import api from "../components/axios";
import EditModal from "../components/editModal";
import { toast } from "react-toastify";


function ProdCards(props){
  return<>
   <div className="prod-container">
    <div>
     <div className="prod-image">
      <img src={props.items.image_url}  alt={props.items.image_title} onError={(e) =>{e.currentTarget.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA1E1MRCAE8Li7ncXbEb6kGyh_QnT4-SicCRQ3PtSj6w&s=10'}}/>
     </div>
    </div>
    <div >
      <div className="prod-info">
        <div className="prod-main">
        <h1 className="prod-name">{props.items.name}</h1>
        <p className="sht-desc">{props.items.short_desc}</p>
        </div>
        <div className="long-desc"><p>{props.items.description}</p></div>
        <h2>29,999</h2>
        <div className="specs">
          {Object.entries(props.items.specifications).map(([key, value])=>(
            <span key={key}>{key} : {value}</span>
          ))}
        </div>
        <div className="add-info">
          {Object.entries(props.items.additional_data).map(([key, value]) =>(
            <span key={key}>{key}:{value}</span>
            ))}
        </div>
        
      </div>
      <button className="buts" onClick={() => {props.onEdit(props.items)}} >Edit</button>
    </div>
   </div>
  </>
}



const Products = ()=> {
  const [editingProd, setEditingProd] = useState(null);


  const fields = [
    'image_url',
    'image_title',
    "name",
    "short_desc",
    "description",
    
  ]

  const [data, setData] = useState([])
  useEffect(()=>{
    api.get("/products", {withCredentials:true})
    .then((res) => {setData(res.data.data)})
    .catch((error)=> {`Error: ${error}`})
  },[])

  const handleEdit = (product) => {
    setEditingProd(product)
  }


  const handleSubmit = async (updatedProd) =>{
    try{
    const response = await api.put(`/products/${updatedProd.prod_id}`,updatedProd,{withCredentials:true} )

    setData((prevProducts) => prevProducts.map((product) => (
      product.prod_id === updatedProd.prod_id ? {...product, ...updatedProd}:product
    )))
   
    setEditingProd(null)
    toast.success('Successfully updated')

  }catch(error){
    console.log("Update failed:", error);
    toast.error('Not updated successfullt'+`error ${error} `)
  }

  }

  return <>
  <div className="prods">
    {data.map((item) =>(
      <ProdCards key={item.prod_id} items={item}  onEdit={handleEdit}/> 
    ))}
    
  </div>
  {editingProd &&(<EditModal data={editingProd} fields={fields} onSave={handleSubmit} onClose={() => setEditingProd(null)} />)} 
  </>
}

export default Products;