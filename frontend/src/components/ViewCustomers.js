import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import '../css/ViewCustomers.css';

const ViewCustomers = () => {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.user.users);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (status === 'loading') {
        return <p>Loading customers...</p>;
    }

    if (status === 'failed') {
        return <p>Error loading customers: {error}</p>;
    }

    return (
        <div className="view-customers-container">
            <h2>Customer List</h2>
            <table className="customer-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.loyaltyPoints}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCustomers;
