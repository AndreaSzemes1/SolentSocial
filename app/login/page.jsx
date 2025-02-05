"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { app } from "../../firebase/firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[90vh] overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
