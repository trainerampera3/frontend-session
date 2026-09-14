import { createContext, useState } from "react";

export  const UserContext = createContext();

export default function UserProvider({children}){
    const [url, setUrl] = useState('http://localhost:8000/');
    const name = 'Jayanth'

    return <>
    <UserContext.Provider value={{url, setUrl, name }}>
    {children}
    </UserContext.Provider>
    </>

}