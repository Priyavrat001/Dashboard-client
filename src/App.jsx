import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { getUser } from './api/getUser';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  const [user, setUser] = useState(null);  // Manage user state
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();  // Await the async getUser call
      setUser(userData);
      setLoading(false);  // Once done loading
    };
    fetchUser();
  }, []);

  console.log(user)

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Routes>
          {/* Protected Route for Dashboard */}
          <Route
            path="/"
            element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>}
          />
          
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={ <SignUp />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
