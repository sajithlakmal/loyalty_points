// src/routes/Routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUser from '../components/CreateUser';
import RedeemPoints from "../components/RedeemPoints";
import AddPoints from "../components/AddPoints";
import ViewCustomers from "../components/ViewCustomers";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateUser />} />
            <Route path="/add-customer" element={<CreateUser />} />
            <Route path="/add" element={<AddPoints />} />
            <Route path="/view-customers" element={<ViewCustomers />} />

            <Route path="/redeem-points" element={<RedeemPoints />} />

        </Routes>
    );
};

export default AppRoutes;
