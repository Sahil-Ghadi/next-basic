'use client';
import axios from 'axios';
import React,{useState} from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Profilepage() {

  const router = useRouter()
  const [data, setData] = useState("nothing")
  const getUserdetailes = async () => {
    const res = await axios.get('/api/user/me')
    console.log(res);
    setData(res.data.data._id)
  }
  const logout = async () => {
    try {
     await axios.get('/api/users/logout')
     toast.success("Logged Out")
     router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  return (
    <div className=''>
      <h1>Profile</h1>
      <hr />
      <h2>Profile page</h2>
      <h2>{data==="nothing"?"NOTHING":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={logout} className='p-3 bg-green-400'>Logout</button>
      <button onClick={getUserdetailes} className='p-3 bg-pink-400'>Details</button>
    </div>
  )
}
