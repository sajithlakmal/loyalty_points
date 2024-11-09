import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addPointsAsync } from '../redux/userSlice';
import '../css/AddPoints.css';

const AddPoints = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const [addData, setAddData] = useState({ userId: '', points: 0 });
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (query) {
            const filteredSuggestions = users.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [query, users]);

    const handleSelectSuggestion = (user) => {
        setAddData({ ...addData, userId: user.id });
        setQuery(`${user.name} (${user.email})`);
        setSuggestions([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'query') {
            setQuery(value);
        } else {
            setAddData({
                ...addData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPointsAsync({ userId: addData.userId, points: addData.points }));
        alert('Points added successfully!');
        setAddData({ userId: '', points: 0 });
        setQuery('');
    };

    return (
        <div className="add-points-container">
            <h2 className="title">Add Points</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="query">User:</label>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        value={query}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Type name or email"
                        required
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => handleSelectSuggestion(user)}
                                >
                                    {user.name} ({user.email})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="points">Points to Add:</label>
                    <input
                        type="number"
                        id="points"
                        name="points"
                        value={addData.points}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add Points</button>
            </form>
        </div>
    );
};

export default AddPoints;
