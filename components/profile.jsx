"use client";

import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {      
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");

        // Fetch user data from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().name) {
          setName(userSnap.data().name);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name });

      await user.reload();
      setUser({...auth.currentUser, displayName: name })

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleUpdateProfile} className="flex flex-col space-y-4">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Update Name
            </button>

            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
