"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import  axios  from "axios";

// useRouter pushes page fields to signup/route.ts
const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(user.email.length>0 
        && user.password.length >0 && user.username.length>0 ){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.error("Signup failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="flex items-center flex-col justify-center py-2">
        <h1 className="text-2xl">Signup</h1> <hr/>
        <div className="flex">
            <label 
            htmlFor="userName"
            className="p-1"
            >UserName:</label>
            <input
            className="p-1 outline-1 border-2 border-sky-400 " 
            type='text'
            id="userName"
            value={user.username}
            placeholder="Enter User Name"
            onChange={(e) => setUser({...user, username:e.target.value})}
            />
        </div>
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
        onClick={onSignup}
        disabled={btnDisabled}
        >Register</button>
        <span className="mt-1">or</span>
        <Link 
        className="mt-1"
        href="/login">Login</Link>
        
    </div>
    )
}
export default SignupPage