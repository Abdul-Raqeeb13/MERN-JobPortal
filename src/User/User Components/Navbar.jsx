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
import { ToastContainer, toast } from "react-toastify";


function MyNavbar() {

    const { isAuthenticated, login, logout, adminLogin } = useAuth();

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

    //     const dataToSend = showForm 
    //         ? { email: userData.email, password: userData.password } 
    //         : userData;

    //     try {
    //         const response = await axios({
    //             method: "POST",
    //             url: showForm ? 'http://localhost:8000/user/login' : 'http://localhost:8000/user/signup',
    //             headers: { 'Content-Type': "application/json" },
    //             data: JSON.stringify(dataToSend)
    //         });

    //         // console.log(response.data);

    //         if (response.data.token) {
    //             // Handle login success, store token, and navigate
    //             localStorage.setItem("Token", response.data.token); 
    //             // setMessage(response.data.message);
    //             toast.success("Login success", {
    //                 position: "top-center",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 theme: "dark",
    //               });

    //               setTimeout(() => {
    //                 handleClose();
    //             login(); // Call login from AuthContext
    //             if (showForm) {
    //                 nav('/'); // Navigate to the homepage after login
    //             }
    //               }, 2000);


    //         } else if (response.data.message === "Signup successful!") {
    //             // If signup is successful, show the login form
    //             // setMessage(response.data.message);

    //             toast.success("Account created successfully!", {
    //                 position: "top-center",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 theme: "dark",
    //               });


    //               setTimeout(() => {
    //                 userData.password = ""
    //             setShowForm(true); // Switch to the login form after successful signup
    //               }, 2500);
    //         } else {
    //             setMessage("Something went wrong, please try again.");
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             setMessage(error.response.data.message);
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

            if (response.data.token) {
                // Handle login success, store token, and navigate
                const userType = response.data.data.usertype;  // Extract usertype from response

                toast.success("Login success", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                setTimeout(() => {
                    handleClose();
                    localStorage.setItem("Token", response.data.token);
                    // Navigate based on usertype
                    if (userType === 'user') {
                        login(); // Call login from AuthContext
                        nav('/');
                    } else if (userType === 'admin') {
                        // localStorage.setItem('admin', JSON.stringify({ loggedIn: true }));
                        nav('/admin', { replace: true });
                        adminLogin()
                        // window.location.replace('/admin');
                    }
                }, 2000);
            } else if (response.data.message === "Signup successful!") {
                toast.success("Account created successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                setTimeout(() => {
                    userData.password = "";
                    setShowForm(true); // Switch to the login form after successful signup
                }, 2500);
            } else {
                setMessage("Something went wrong, please try again.");
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

        toast.success("Logout success", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });

        setTimeout(() => {
            logout()
            nav('/')
        }, 2000);
    }


    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showForm ? "Login" : "SignUp"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* {message && showForm ? "" : <p className="custom-alert-message">{message}</p> } */}
                    {message && <p className="custom-alert-message">{message}</p>}
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
