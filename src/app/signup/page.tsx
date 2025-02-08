"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDis, setButttonDis] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButttonDis(false);
    } else {
      setButttonDis(true);
    }
  }, [user]);

  return (
    <div className="bg-[url('/Cool-bg.jpg')] bg-cover bg-no-repeat">
      <div className="flex items-center justify-center h-screen">
        <div className="h-[420px] w-[410px] flex flex-col items-center justify-center bg-white rounded-2xl">
          <h1 className="text-center text-black font-semibold text-4xl mb-6">
            SignUp
          </h1>
          <hr />

          <input
            className="rounded-full px-4 py-2 mb-3 w-[275px] bg-gray-100 text-black border-gray-200 border-2"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />

          <input
            className="rounded-full px-4 py-2 mb-3 w-[275px] bg-gray-100 text-black border-gray-200 border-2"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />

          <input
            className="rounded-full px-4 py-2 mb-4 w-[275px] bg-gray-100 text-black border-gray-200 border-2"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button className="rounded-full px-3 py-2 mb-3 text-center bg-blue-700 w-[275px] hover:bg-blue-800 active:bg-blue-900">
            Sign Up
          </button>
          <div className="flex">
            <span className=" text-black">Already have an account?&nbsp;</span>
            <Link
              className="text-blue-600 underline hover:text-blue-800 active:text-blue-900"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
