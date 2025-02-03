"use client ";
import axios from "axios"
import Link from "next/link";
import React,{useState, useEffect} from "react";

export default function VerifyEmailPage(){
    const [token,setToken] = useState("")
    const [verified, setVerified] = useState(false);
    const [error,setError] = useState(false)

    const verifyUser = async () => {
        try {
           await axios.post('/api/users/verifyEmail', {token})
           setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.message.data);     
        }
    }

    useEffect(() => {
       const urlToken = window.location.search.split("=")[1];
       setToken(urlToken || '');
      }, [])
      
    useEffect(() => {
      if(token.length > 0){
        verifyUser();
      }
    }, [token])
   
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl">Verify email</h1>
          <h2 className="bg-purple-600">{token? `${token}`: "no token"}</h2>
          {verified && (<>
            <div> Verified </div>
            <Link href="/login">Login</Link>
            </>
          )}
          {error && (<>
            <div> error Nerified </div>
            <Link href="/login">Login</Link>
            </>
          )}
        </div>
        </>
    )
}