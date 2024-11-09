import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/actions';
import '../css/CreateUser.css';

const CreateUser = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        points: 0,
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(userData));
        setSuccess(true);
        setUserData({ name: '', email: '', points: 0 });

        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="create-user-container">
            <h2 className="title">Create User</h2>
            {success && <div className="success-message">User created successfully!</div>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="points">Initial Points:</label>
                    <input
                        type="number"
                        id="points"
                        name="points"
                        value={userData.points}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <button type="submit" className="submit-btn">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
