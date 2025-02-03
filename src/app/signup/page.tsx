
'use client'
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
    const [user,setUser] = useState({
        email:"",
        password:"",
        username: "",
    })
    const [buttonDis,setButttonDis] = useState(false)
    const [loading,setLoading] = useState(false)


    const onSignup = async () => {
      try {
        setLoading(true)
        const response = await axios.post("/api/users/signup",user)
        console.log(response.data);
        router.push("/login")
        
      } catch (error:any) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }

    }

    useEffect(() => {
     if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButttonDis(false)
     }
     else{
      setButttonDis(true)
     }
    }, [user])
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>SignUp</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className='p-3 text-black'
        type="text" 
        id="username"
        value={user.username} 
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username' />

        <label htmlFor="email">email</label>
        <input 
        className='p-3 text-black'
        type="text" 
        id="email"
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email' />

        <label htmlFor="password">password</label>
        <input 
        className='p-3 text-black'
        type="password" 
        id="password"
        value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password' />
        <button onClick={onSignup} className='p-3'> {buttonDis?"true":"false"} sign Up</button>
        <Link href="/login">go to login</Link>
    </div>
  )
}

