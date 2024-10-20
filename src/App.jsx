import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { getUser } from './api/getUser';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

function App() {

  const [user, setUser] = useState(null);  // Manage user state
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
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
          <Route path='*' element={<PageNotFound />} /> 
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
