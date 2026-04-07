import './styles/globals.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from 'react';
import RoutePaths from './util/RoutePaths';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import RouteTitleMap from './util/RouteTitleMap';

// Components
import Header from './components/headers/Header';
import Footer from './components/footers/Footer';

// Generic
import Home from './pages/generic/home';

function RouteTitleHandler() {
    const location = useLocation();
    
    useEffect(() => {
        const routeMatch = RouteTitleMap.find(route => route.path === location.pathname);
        document.title = routeMatch ? routeMatch.title : 'Aurora';
    }, [location]);

    return null;
};

export default function App() {
    return (
        <Router>
            <RouteTitleHandler />
            <Toaster position="bottom-center" toastOptions={{
                style: {
                    borderRadius: 30
                }
            }} />

            <Routes>
                {/* Generic */} 
                <Route path={RoutePaths.HOME} element={<><Header/><Home/><Footer/></>}/>
            </Routes>
        </Router>
    );
}
