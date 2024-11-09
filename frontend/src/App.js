import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes/Routes';

const App = () => {
    return (
        <Router>
            <Navigation />
            <div className="content">
                <AppRoutes />
            </div>
        </Router>
    );
};

export default App;
