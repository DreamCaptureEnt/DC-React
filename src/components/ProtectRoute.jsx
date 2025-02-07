import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show loading or spinner while checking authentication state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/admin-login" />;
  }

  // Otherwise, render the child components using <Outlet />
  return <Outlet />;
};

export default ProtectedRoute;
