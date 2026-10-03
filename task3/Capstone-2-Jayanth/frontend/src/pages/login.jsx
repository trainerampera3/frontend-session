import React,{useState} from "react";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../components/axios";


function Login({setLoggedIn}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:8000/login',
                {
                    method:'POST',
                    credentials:'include',
                    headers : {
                        'content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        username: username,
                        password: password,
                    })
                }
            )

            const data  = await response.json()

            if(response.ok){
                console.log('Login Successful')
                console.log(data)
                setToken(data.token)
                // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                toast.success('Login Successful')
                navigate('/', {replace:true})
                setLoggedIn(true)
            }
            else{
                console.log('Login failed')
                console.log('data.detail')
                toast.error(`Error login failed`)
            }

        }
        catch(error){
            console.log('Server error : ', error)
            toast.error(`Error ${error} ${error.detail}`)
        }

    }

    return<>
     <div className='login'>
        <div className="login-container">
            <div className="center"><h2>Login</h2></div>
            <div>
                <form className="login-form" onSubmit={handleLogin}>
                <div className="user">
                    <div className="login-vals">
                    <label htmlFor='username'>Username</label>
                    <input type="text" className="user-in" name='username' required placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                    <div className="login-vals">
                    <label htmlFor='password'>Password</label>
                    <input type="password" className="pass-in" name='password' required placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </div>
                <div >
                    <button type='submit'  className="buts" >Submit</button>
                </div>
                </form>
            </div>
        </div>
     </div>
    </>
}


export default Login

