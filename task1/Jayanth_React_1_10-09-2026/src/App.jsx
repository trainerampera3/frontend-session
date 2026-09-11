import { useEffect, useState } from "react"
import './App.css'



export function Tablefetch({table}){
  const [items, setItems] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${table}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
      setDataLoaded(true)})
      .catch(err => console.log(err));
  }, [table]);
  const cols = Object.keys(items[0] || {})


  return <div>
    {!dataLoaded?<p>Loading...</p>:(
    <table className='table-container'>
      <thead className>
        {cols.map((col) => (
          <th key={col}>{col}</th>
        ))}
    </thead>

    <tbody>
    {items.map((item, index) => (
      <tr key={index}>
       {Object.values(item).map((key) =>(
        <td key={key}>{key}</td>
       ))}
      </tr>
    ))}
    </tbody>
    </table>
    )}
  </div>
}


function App(){
  return <div>
    <Tablefetch table='orders' />
    <Tablefetch table='orders' />
  </div>
}

export default App