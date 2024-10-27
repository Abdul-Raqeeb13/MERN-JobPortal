import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../User CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../User Pages/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyNavbar() {
    const { isAuthenticated, login, logout, adminLogin } = useAuth();
    const [showForm, setShowForm] = useState(false);
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
        setMessage("");
        setShowForm(false);
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
                const userType = response.data.data.usertype;  
                const userId = response.data.data._id;  

                toast.success("Login success", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("UserID", userId);

                setTimeout(() => {
                    handleClose();
                    if (userType === 'user') {
                        login();
                        nav('/');
                    } else if (userType === 'admin') {
                        nav('/admin', { replace: true });
                        adminLogin();
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
                    setShowForm(true);
                }, 2500);
            } else {
                setMessage("Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            setMessage(error.response?.data?.message || "Something went wrong");
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
            localStorage.clear();
            logout();
            nav('/');
        }, 2000);
    };

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showForm ? "Login" : "SignUp"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && <p className="custom-alert-message">{message}</p>}
                    <form onSubmit={handleSubmit} className="custom-modal-form">
                        {!showForm && (
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

            <Navbar expand="lg" className="custom-navbar">
                <Navbar.Brand href="/" className="navbar-brand ms-lg-5 ms-3">
                    MY APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='me-5'>
                    <Nav className="ms-lg-auto ms-3 me-lg-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                            HOME
                        </NavLink>
                        <NavLink to="/userjobs" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                            Jobs
                        </NavLink>
                        <NavLink to="/userappliedjobs" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                            Applied Jobs
                        </NavLink>
                    </Nav>
                    <Form inline className="ms-lg-5 ms-3 search-form">
                        {
                            isAuthenticated ? (
                                <Button variant="contained" color='success' onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Button variant="contained" color='success' onClick={handleShow}>
                                    {showForm ? "Login" : "SignUp"}
                                </Button>
                            )
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default MyNavbar;
