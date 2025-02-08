"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDis, setButtonDis] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDis(false);
    } else {
      setButtonDis(true);
    }
  }, [user]);

  return (
    <div className="bg-[url('/Cool-bg.jpg')] bg-cover bg-no-repeat">
      <div className="flex items-center justify-center h-screen">
        <div className="h-[420px] w-[410px] flex flex-col items-center justify-center bg-white rounded-2xl">
          <h1 className="text-center text-black font-semibold text-4xl mb-6">
            {loading ? "processing" : "Login"}
          </h1>
          <hr />
          <input
            className="rounded-full px-4 py-2 mb-3 w-[275px] bg-gray-100 text-black border-gray-200 border-2"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />

          <input
            className="rounded-full px-4 py-2  bg-gray-100 mb-4 w-[275px]  border-gray-200 text-black border-2 "
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            onClick={onLogin}
            className="rounded-full px-3 py-2 mb-3 text-center bg-blue-700 w-[275px] hover:bg-blue-800 active:bg-blue-900"
          >
            {" "}
            Log In{" "}
          </button>
          <div className="flex">
            <span className=" text-black">Don't have an account?&nbsp;</span>
            <Link
              className="text-blue-600 underline hover:text-blue-800 active:text-blue-900"
              href="/signup"
            >
              {" "}
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
