"use client";

import { app } from "@/firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().isAdmin) {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router, db]);

  if (loading) {
    return <p className="text-center text-gray-600">Checking admin access...</p>;
  }

  return isAdmin ? children : null;
};

export default AdminGuard;
