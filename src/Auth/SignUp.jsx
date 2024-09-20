// import { Button, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import axios from 'axios';
// import { Container } from 'react-bootstrap';

// export default function SignUp() {

//     const [userData, setUserData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         usertype: "user"

//     })

//     const [message , setMessage] = useState("")

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         setUserData((prev) => ({
//             ...prev,
//             [name]: value,
//         }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(userData);
        
//         try {
            
//             const response = await axios ({
//                 method : "POST",
//                 url : 'http://localhost:8000/user/signup',
//                 headers : {
//                     'Content-Type' : "application/json"
//                 },
//                 data : JSON.stringify(userData)
//             })
//             setMessage(response.data.message);
            
//         } catch (error) {
//             if (error.response) {
//                 setMessage(error.response.data.message); // Server error response
//             }
//             else{
//                 setMessage("Something went wrong");
                
//             }
//         }

//     }
//     return (
//         <>
//         <Container>
//             <h1>SignUp Form</h1>
//             {message ?? alert(message)}
//             <form onSubmit={handleSubmit}>
//                 <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={userData.name} onChange={handleInputChange} />
//                 <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={userData.email} onChange={handleInputChange} />
//                 <TextField id="outlined-basic" label="Password" variant="outlined" name="password" value={userData.password} onChange={handleInputChange} />
//                 <Button variant="contained" type="submit">Create Account</Button>
//             </form>
//             </Container>
//         </>
//     )
// }
