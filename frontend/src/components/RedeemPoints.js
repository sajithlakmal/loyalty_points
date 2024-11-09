import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, redeemPointsAsync } from '../redux/userSlice';
import '../css/RedeemPoints.css';

const RedeemPoints = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const [query, setQuery] = useState('');
    const [userId, setUserId] = useState('');
    const [points, setPoints] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (query) {
            const filteredSuggestions = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [query, users]);

    const handleSelectSuggestion = (user) => {
        setUserId(user.id);
        setQuery(`${user.name} (${user.email})`);
        setSuggestions([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'query') {
            setQuery(value);
        } else {
            setPoints(value);
        }
    };

    const handleRedeem = () => {
        if (!userId || points <= 0) {
            alert('Please select a valid customer and enter valid points.');
            return;
        }
        dispatch(redeemPointsAsync({ userId, points: Number(points) }))
            .then(() => {
                setSuccessMessage('Points redeemed successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                setQuery('');
                setPoints('');
            })
            .catch((error) => console.error('Failed to redeem points:', error));
    };

    return (
        <div className="redeem-points-container">
            <h2>Redeem Points</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input
                type="text"
                name="query"
                placeholder="Type name or email"
                value={query}
                onChange={handleChange}
                autoComplete="off"
                className="input-field"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((user) => (
                        <li key={user.id} onClick={() => handleSelectSuggestion(user)}>
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="number"
                name="points"
                placeholder="Points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="input-field"
            />
            <button onClick={handleRedeem} className="redeem-button">
                Redeem Points
            </button>
        </div>
    );
};

export default RedeemPoints;
