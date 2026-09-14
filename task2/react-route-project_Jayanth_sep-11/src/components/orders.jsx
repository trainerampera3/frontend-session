import { useEffect, useState } from "react"
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./context";
import './prod.css'



export function Orders(){
  const {url} = useContext(UserContext)
  const [items, setItems] = useState([])
  useEffect(() => {
    axios.get(url+'orders')
    .then((res)=> {setItems(res.data)})
    .catch((error)=> {console.log(error)})
    .finally(() => {console.log('Request completed')})
  }, []);
  const cols = Object.keys(items[0] || [])
  return <div>
    <div className="head">
        {cols.map((col)=> (<div className='head-item'>{col}</div>))}
    </div>
    <div className="rbody">
    
        {items.map((item)=>(
          <div className='row'>{cols.map((col)=> (<div className='row-item'>{item[col]}</div>))}</div>))}
    </div>
  </div>
}
