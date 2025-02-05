"use client";

import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { app } from "../../firebase/firebase.config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyString, setVerifyString] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const ADMIN_CODE = "special_admin_code";

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
   
      await updateProfile(user, { displayName: name });

      const isAdmin = verifyString === ADMIN_CODE;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        isAdmin,
      });
      
      router.push("/"); // Redirect to home after signup
    } catch (error) {
      setError("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
          <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long.</p>

          <input
            type="text"
            placeholder="Admin Verification String (Optional)"
            value={verifyString}
            onChange={(e) => setVerifyString(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
