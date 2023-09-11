"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  interface userDetails {
    email: string;
    password: string;
    username: string;
  }

  const router = useRouter();

  const [user, setUser] = useState<userDetails>({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      // React Hot Toast Impleement
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
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="JohnDoe"
      />
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
        onClick={onSignup}
      >
        Sign Up
      </button>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default SignupPage;
