import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../User CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../User Pages/AuthContext';
// import navlogo from '../Assets/images/file.png'

function MyNavbar() {

    const { isAuthenticated,  login , logout} = useAuth();

    const [showForm, setShowForm] = useState(false); // Controls whether login or signup is shown
    const [show, setShow] = useState(false);
    const nav = useNavigate();

    const handleClose = () => {
        setShow(false);
        setUserData({
            name: "",
            email: "",
            password: "",
            usertype: "user"
        });
        setMessage(""); // Optionally clear the message
        setShowForm(false); // Reset to signup form when modal is closed
    };
    
    const handleShow = () => setShow(true);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        usertype: "user"
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Create a new object with the required fields based on the form type (Login or SignUp)
    //     const dataToSend = showForm 
    //         ? { email: userData.email, password: userData.password } // Only send email and password for login
    //         : userData; // Send all fields for signup
    
    //     try {
    //         const response = await axios({
    //             method: "POST",
    //             url: showForm ? 'http://localhost:8000/user/login' : 'http://localhost:8000/user/signup',
    //             headers: { 'Content-Type': "application/json" },
    //             data: JSON.stringify(dataToSend) // Only send the appropriate data
    //         });
    //         console.log(response.data);
    //         localStorage.setItem("Token" , response.data.token)
    //         setMessage(response.data.message);
            

    //         if (!showForm) {
    //             // If the form is for signup and the request is successful, switch to login form
    //             setShowForm(true); // Switch to login form
    //             setUserData({
    //                 name: "",
    //                 email: "",
    //                 password: "",
    //                 usertype: "user"
    //             }); // Clear user data
    //             setMessage("")
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             setMessage(error.response.data.message); // This will catch "Invalid Password" or other error messages
    //         } else {
    //             setMessage("Something went wrong");
    //         }
    //     }
    // };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const dataToSend = showForm 
            ? { email: userData.email, password: userData.password } 
            : userData;
    
        try {
            const response = await axios({
                method: "POST",
                url: showForm ? 'http://localhost:8000/user/login' : 'http://localhost:8000/user/signup',
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(dataToSend)
            });
    
            console.log(response.data);
            if (response.data.token) {
                // Only store the token and navigate if the token exists
                localStorage.setItem("Token", response.data.token); 
                setMessage(response.data.message);
                handleClose()
                login();
    
                // Check if login was successful, then navigate
                if (showForm) {
                    console.log("Navigating to home...");
                    nav('/');  // Navigate to the home route
                }
            } else {
                // Handle case where no token is returned
                setMessage("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong");
            }
        }
    };

    const handleLogout = () => {
        logout()
        nav('/')
    }
    
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showForm ? "Login" : "SignUp"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    {/* {message && showForm ? "" : <p className="custom-alert-message">{message}</p> } */}
                    {message && <p className="custom-alert-message">{message}</p> }
                    <form onSubmit={handleSubmit} className="custom-modal-form">
                        {!showForm && ( // Only show Name field in Signup form
                            <TextField id="name" label="Name" variant="outlined" name="name" value={userData.name} onChange={handleInputChange} className="custom-modal-input" />
                        )}
                        <TextField id="email" label="Email" variant="outlined" name="email" value={userData.email} onChange={handleInputChange} className="custom-modal-input" />
                        <TextField id="password" label="Password" variant="outlined" name="password" value={userData.password} onChange={handleInputChange} className="custom-modal-input" />
                        <Button variant="contained" type="submit" className="custom-modal-btn">{showForm ? "Login" : "Create Account"}</Button>
                        <p>
                            {showForm ? "Don't have an account?" : "Already have an account?"} 
                            <Link onClick={() => setShowForm(!showForm)}>
                                {showForm ? "SignUp" : "Login"}
                            </Link>
                        </p>
                    </form>
                </Modal.Body>
            </Modal>

            <Navbar bg="primary" expand="lg" className="custom-navbar">
                <Navbar.Brand href="/" className="navbar-brand ms-lg-5 ms-3">
                    MY APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='me-5'>
                    <Nav className="ms-lg-auto ms-3 me-lg-auto">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? 'nav-link active' : "nav-link"
                        }>
                            HOME
                        </NavLink>
                        <NavLink to="/userjobs" className={({ isActive }) =>
                            isActive ? 'nav-link active' : "nav-link"
                        }>
                            Jobs
                        </NavLink>
                        {/* <NavLink to="/movies" className={({ isActive }) =>
                            isActive ? 'nav-link active' : "nav-link"
                        }>
                            MOVIES
                        </NavLink> */}
                    </Nav>
                    <Form inline className="ms-lg-5 ms-3 search-form">
                        {
                            isAuthenticated ? 
                            <Button variant="contained" color='success' onClick={handleLogout}>
                                Logout
                            </Button>
                            :
                            <Button variant="contained" color='success' onClick={handleShow}>
                            {showForm ? "Login" : "SignUp"}
                            </Button>
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default MyNavbar;
