import { useState, useEffect } from "react";
import useDebonce from "./useDebounce.jsx";
import footballers from "./footballers.js";

const FootballersSearch = () => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebonce(query, 1000)
    const [results, setResults] = useState([])

    useEffect(() => {
        if(debouncedQuery){
            const filresults = footballers.filter((footballer) => 
                footballer.toLowerCase().includes(debouncedQuery.toLowerCase()),
            );
            console.log('Search Results:',results)
            setResults(filresults)
        }
        else{
            console.log('Search results: []')
        }
    }, [debouncedQuery])


    return <>
    <h1 style={{textAlign:"center"}}>Football Search App</h1>
    <div style={{textAlign:'center'}}>
        <input 
        style={{padding:'0.5rem', width:'30%'}}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search  for a footballer"
        />
        <p>{results.map((result) =>( <div>{result}</div>))}</p>
        </div></>
}

export default FootballersSearch