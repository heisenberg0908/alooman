const express=require('express')
const userRouter=express.Router()
const {User, Address, Order,Notification}=require('../db')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const zod=require('zod')
const { JWT_SECRET } = require('../config')

const signupData=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    userName:zod.string().email(),
    password:zod.string().min(6)
})

userRouter.post('/signup',async(req,res)=>{
    const {success}=signupData.safeParse(req.body)
    if(!success){
        return res.status(401).json({
            msg:"inavlid input format"
        })
    }
    const {firstName,lastName,userName,password}=req.body
    const existingUser=await User.findOne({userName})
    if(existingUser){
        return res.status(401).json({
            msg:"user with this email already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=await User.create({
        firstName,
        lastName,
        userName,
        password: hashedPassword
    })
    const userId=newUser._id
    const token=jwt.sign({userId},JWT_SECRET)


    res.status(200).json({
        msg:"user signed up successfully",
        token:token
    })
})

const signinData=zod.object({
    userName:zod.string().email(),
    password:zod.string().min(6)
})

userRouter.post('/signin',async(req,res)=>{
    const {success}=signinData.safeParse(req.body)
    if(!success){
        return res.status(401).json({
            msg:"user signed in successfully"
        })
    }
    const {userName,password}=req.body
    const user=await User.findOne({
        userName
    })
    const ispasswordvalid=await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
        return res.status(401).json({
            msg:"no userfound with these credentials"
        })
    }
    const userId=user._id
    const token=jwt.sign({userId},JWT_SECRET)
    
    res.status(200).json({
        msg:"user signed in successfully",
        token:token
    })
})

userRouter.get('/profile', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Token not found, invalid authentication, try signing in again."
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId); // Assuming userId is the _id field in your User model

        if (!user) {
            return res.status(404).json({
                msg: "No user info found, try again."
            });
        }

        res.status(200).json({
            msg: "User's profile",
            fname:user.firstName,
            lname:user.lastName,
            userName:user.userName // You can customize what user details to return
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred."
        });
    }
});


userRouter.post('/addaddressdetails',async(req,res)=>{
    const token=req.headers.authorization
    if(!token){
        return res.status(401).json({
            msg:"authorization failed, try signing again!"
        })
    }
    try {
        const decoded=jwt.verify(token.split(' ')[1],JWT_SECRET)
        const userId=decoded.userId
        const {street,state,city,landmark,zipcode,phoneNumber}=req.body
        const address=await Address.create({
            userId,street,city,state,landmark,zipcode,phoneNumber
        })
        return res.status(200).json({
            msg:"users address details",
            adressId:address._id
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"an error occurred,please try again!"
        })
    }
})

userRouter.put('/editaddressdetails', async (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({
            msg: "Not authorized, try again!"
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;
        const { street, city, state, landmark, zipcode, phoneNumber } = req.body;

        const updatedAddressDetails = await Address.findOneAndUpdate(
            { userId },
            { street, city, state, landmark, zipcode, phoneNumber },
            { new: true } // Return the updated document
        );

        if (!updatedAddressDetails) {
            return res.status(404).json({
                msg: "Address not found!"
            });
        }

        return res.status(200).json({
            msg: "Address updated successfully",
            newAddressDetails: updatedAddressDetails
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred, please try again!"
        });
    }
});


userRouter.get('/getaddressdetails', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Not authorized, please sign in again."
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;

        const addressDetails = await Address.findOne({ userId });

        if (!addressDetails) {
            return res.status(404).json({
                msg: "Address details not found for the user."
            });
        }

        return res.status(200).json({
            msg: "Address details retrieved successfully.",
            street: addressDetails.street,
            landmark: addressDetails.landmark,
            city: addressDetails.city,
            state: addressDetails.state,
            zipcode: addressDetails.zipcode,
            phoneNumber: addressDetails.phoneNumber
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json("An error occurred, please try again!");
    }
});


userRouter.get('/notifications', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized, no auth token, try signing in again!"
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;
        const notifications = await Notification.find({
            userId: userId
        });

        return res.status(200).json({
            msg: "Your notifications",
            notifications: notifications
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred, please try again!"
        });
    }
});

module.exports=userRouter