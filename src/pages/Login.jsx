import React, { useEffect, useState } from 'react';
import { userLogin } from '../api/login';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = ({user}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await userLogin(username, password);
        setLoading(false);
        


        if (result) {
            toast.success("Login successfully");
            // After successful login, navigate and fetch user data
            navigate("/");
            // Fetch user data after login (`/me` is the route for fetching user info)
            const userToken = localStorage.getItem("user-token");
            if (userToken) {
                const userData = await fetch(`${key}/api/v1/user/me`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "application/json"
                    }
                });

                if (userData.ok) {
                    const user = await userData.json();
                    console.log("Logged in user data:", user);
                    // Now you have the user data, use it in your app
                } else {
                    toast.error("Failed to fetch user data");
                }
            }
        } else {
            toast.error("Login failed, please check your credentials");
        }
    };

    useEffect(() => {
      if(user) return navigate("/")
    }, [user])
    

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="navigateSignup">
                    <p>Don'nt have an account <span
                        onClick={() => navigate("/signup")}
                        style={{
                            color: 'blue'
                        }}
                    >Signup</span></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
