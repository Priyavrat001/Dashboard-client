import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { userSignup } from '../api/signup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        if (password && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            userSignup(name, username, password)
            toast.success('Signup successful');
            return navigate("/login")
        }
        setUsername('')
        setName('')
        setPassword('')
    };
    
    return (
        <div className="signup-container">
            <h2 className="signup-heading">Signup Form</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Name:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="input-group">
                    <label className="input-label">Username:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
                </div>

                <div className="input-group">
                    <label className="input-label">Password:</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
                <div className="navigateSignup">
                    <p>Already have an account <span
                        onClick={() => navigate("/login")}
                        style={{
                            color: 'blue'
                        }}
                    >Login</span></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
