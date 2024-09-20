// import { Button as BootstrapButton } from 'react-bootstrap';
// import { Button as MUIButton } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserAppLayout from './User/User Pages/UserAppLayout';
import SignUp from './Auth/SignUp';
// import Home from './User/User Pages/Home';
import Home from './User/User Pages/Home'
import UserJobs from './User/User Pages/UserJobs';
import { AuthProvider } from './User/User Pages/AuthContext';
import ProtectedRoute from './User/User Pages/ProtectedRoute'

const router  = createBrowserRouter([
  {
    path : "/",
    element : <UserAppLayout/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/userjobs",
        element: <ProtectedRoute element={<UserJobs />} />
      },
      // {
      //   path : "/movies",
      //   element: <ProtectedRoute element={<Movies />} />
      // },

      // {
      //   path : "/signup",
      //   element : <SignUp/>
      // }
    ]
  }
])
const App = () => {


  // const { isAuthenticated,  login , logout} = useAuth();

  // const [showForm, setShowForm] = useState(false); // Controls whether login or signup is shown
  // const [show, setShow] = useState(false);
  // const nav = useNavigate();

  // const handleClose = () => {
  //     setShow(false);
  //     setUserData({
  //         name: "",
  //         email: "",
  //         password: "",
  //         usertype: "user"
  //     });
  //     setMessage(""); // Optionally clear the message
  //     setShowForm(false); // Reset to signup form when modal is closed
  // };
  
  // const handleShow = () => setShow(true);

  // const [userData, setUserData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     usertype: "user"
  // });

  // const [message, setMessage] = useState("");



  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App