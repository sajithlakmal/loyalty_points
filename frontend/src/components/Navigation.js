import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <h1 className="nav-title">Loyalty Points System</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/add-customer" className="nav-link">Add Customer</Link>
                </li>
                <li>
                    <Link to="/add" className="nav-link">Add Points</Link>
                </li>
                <li>
                    <Link to="/redeem-points" className="nav-link">Redeem Points</Link>
                </li>
                <li>
                    <Link to="/view-customers" className="nav-link">View All Customers</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
