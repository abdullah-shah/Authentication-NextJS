"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";


const LoginPage = () => {
    const router = useRouter();
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    useEffect(()=>{
        if(user.email.length>0 
        && user.password.length >0 ){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    const onLogin = async (e:any) => {
        try{
            setLoading(true);
            const response = await axios.post('/api/users/login', user)
            console.log('logged in successfully', response.data);
            router.push('/profile');

        }
        catch(error:any){
            console.error('login failed', error.message)

        }
        finally{
            setLoading(false);

        }

    }
    
    return (
        <div className="flex items-center flex-col justify-center py-2">
            <h1 className="text-2xl">Login</h1> <hr/>
            <div className="flex mt-4">
                <label 
                htmlFor="email"
                className="p-1"
                >Email:</label>
                <input
                className="p-1 outline-1 border-2 border-sky-400" 
                type='email'
                id="email"
                value={user.email}
                placeholder="Enter Email"
                onChange={(e) => setUser({...user, email:e.target.value})}
                />
            </div>
            <div className="flex mt-4">
                <label 
                htmlFor="password"
                className="p-1"
                >Password:</label>
                <input
                className="p-1 outline-1 border-2 border-sky-400 " 
                type='password'
                id="password"
                value={user.password}
                placeholder="Enter Password"
                onChange={(e) => setUser({...user, password:e.target.value})}
                />
            </div>
            <button 
            className="mt-2 p-2 text-white bg-slate-600 border-2 border-slate-500 hover:bg-black"
            type="submit"
            onClick={onLogin}
            disabled={btnDisabled}
            >Login</button>
            <span className="mt-1">or</span>
            <Link 
            className="mt-1"
            href="/signup">Create new account</Link>
            
        </div>
    )
}
export default LoginPage