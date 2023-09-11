"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  interface userLoginData {
    email: string;
    password: string;
  }

  const router = useRouter();

  const [user, setUser] = useState<userLoginData>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      // toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">Email</label>
      <input
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="example@email.com"
      />
      <label htmlFor="username">Password</label>
      <input
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="******"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
};

export default LoginPage;
