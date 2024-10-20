import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../api/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = userLogin(username, password);
        setLoading(false);

        if (result) {
            toast.success("Login successfully");
            return navigate("/");
        }


    };


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
