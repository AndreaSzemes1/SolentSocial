"use client";

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';

const Header = () => { 
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setIsLoading(false);
      setUser(user);
      
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().isAdmin);
        } else {
          setIsAdmin(false);
        }
      }
   });
   return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error); 
    }
  };

  if (isLoading) {
    return null; 
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">Solent Social</Link>
      </div>
      <nav>
        <ul className="flex gap-4 items-center">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/events" className="hover:underline">Events</Link></li> 
          {user ? (
            <span className="flex gap-4 items-center">
              <li> <Link href="/profile" className="hover:underline">Profile</Link></li>
              <li><Link href="/booking-history" className="hover:underline">Booking history</Link></li>
              {isAdmin && (
              <li><Link href="/admin" className="hover:underline">Admin</Link></li>
              )}
              <li id="logout-btn-li">
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                  Logout
                  </button>
              </li> 
            </span>
       
            ) : (
              <span className="flex gap-4 items-center">
                <li><Link href="/signup">Signup</Link></li>
                <li><Link href="/login">Login</Link></li>
              </span>
            )}
        </ul>
      </nav>
    </header> 
  );
};

export default Header;
 