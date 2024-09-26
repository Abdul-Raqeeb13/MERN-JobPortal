import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../User Pages/AuthContext';



const AdminDashboard = () => {


    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if the user came from a specific route
        if (location.pathname === '/admin') {
            // Push the current state into history to prevent going back
            window.history.pushState(null, null, window.location.href);

            // Disable the back button
            const preventBack = () => {
                window.history.pushState(null, null, window.location.href);
            };

            // Listen for 'popstate' event (triggered when back button is pressed)
            window.addEventListener('popstate', preventBack);

            // Cleanup the event listener on unmount
            return () => {
                window.removeEventListener('popstate', preventBack);
            };
        }
    }, [location.pathname, nav]);

    return (
        <div>
            <h1>Protected Page</h1>
            <p>This page prevents going back to the previous route.</p>
        </div>
    );
};

export default AdminDashboard;
