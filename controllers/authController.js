const userValidator = require("../validators/authValidator")
const {findUser , createUser} = require('../models/authModel')
const bcrypt = require('bcrypt');
const loginValidator = require("../validators/loginValidator");
const JWT = require('jsonwebtoken')
require("dotenv").config()


exports.signup = async (req, res) => {
    try {
        
        const {error , value} = userValidator.validate(req.body);
        if (error) {
            res.status(400).send({
                message: error.details[0].message
              });
        }

        else{

            const {name , email , password , usertype} = req.body

            const checkEmailExist = await findUser({email:email})
            
            if (checkEmailExist) {
                return res.status(409).send({
                    message: 'Email already exists'
                  });
            } else {

                const hashPassword = await bcrypt.hash(password , 12)
                req.body.password = hashPassword


                const data = await createUser(req.body)

                 return res.status(200).send({
                        message: 'Signup successful!',
                        user: value // Assuming 'value' contains validated user data
                      });
                    
            }


            // res.status(200).send({
            //     message: 'Signup successful!',
            //     user: value // Assuming 'value' contains validated user data
            //   }); 
        }
        
    } catch (error) {
        res.send(error)
    }
} 


// exports.login = async (req, res) => {

//     // try {
//         const {error , value} = loginValidator.validate(req.body);
//         if (error) {
//             res.status(400).send({
//                 message: error.details[0].message
//               });
//         }

//         else{  
//             const {email , password} = req.body
//             const findUserData = await findUser({email:email})
            
//             if(findUserData){
//                 const checkPassword = await bcrypt.compare(password, findUserData.password)
//                 console.log(checkPassword);
//                 if(checkPassword){
//                     // console.log(findUserData._id);
//                     // console.log(process.env.SECRET_KEY);
                    
//                     const token = JWT.sign({_id : findUserData._id}, process.env.SECRET_KEY, {expiresIn : '2h'})
//                     res.send({
//                         message:"Login Success",
//                         data:findUserData,
//                         token
//                     })


//                     // res.status(200).send({
//                     //     message: "Login Success"
//                     // });
//                 }
//                 else{
//                     res.status(400).send({
//                         message: " Password"
//                     });
//                 }
                
//             }
//             else{
//                 res.send({
//                     message: "User Not Found"
//                 })
//             }
            

            
//         }
//     // } catch (error) {
//     //     res.send({
//     //         message : error
//     //     })
//     // }Invalid

// }


exports.login = async (req, res) => {
    const {error , value} = loginValidator.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const {email, password} = req.body;
    const findUserData = await findUser({ email: email });

    if (findUserData) {
        const checkPassword = await bcrypt.compare(password, findUserData.password);
        if (checkPassword) {
            const token = JWT.sign({ _id: findUserData._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
            return res.send({
                message: "Login Success",
                data: findUserData,  // Ensure usertype is included here
                token
            });
        } else {
            return res.status(400).send({
                message: "Invalid Password"
            });
        }
    } else {
        return res.status(404).send({
            message: "User Not Found"
        });
    }
};
