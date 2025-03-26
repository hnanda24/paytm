const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/db");
const Account = require("../models/db");
const SECRET = "BLABLABLA";
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/authMiddleware");

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(4),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email({message: "Invalid Email Id"})
})

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const updateDataSchema = zod.object({
    password: zod.string().min(4).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post("/signup", async(req,res) => {
    try{
        const body = req.body;
        const {success} = signupSchema.safeParse(req.body);
        if(!success){
            return res.json({
                msg: "Incorrect inputs"
            })
        }

        const hashedPassword = await bcrypt.hash(body.password,10);

        const userData = {
            ...body,
            password: hashedPassword
        }

        const dbUser = await User.create(userData);

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        res.status(201).json({
            msg: "User Signup success",
            // dbUser
        })
    }
    catch(err){
        res.status(500).json({
            msg: "Internal Server error",
            err
        })
    }
})

router.post("/login", async(req,res) => {
    try{
        const body = req.body;
        const {success} = loginSchema.safeParse(req.body);
        if(!success){
            return res.json({
                msg: "Wrong email or password"
            })
        }

        const validUser = await User.findOne({
            email: body.email
        })

        if(!validUser){
            return res.json({
                msg: "Invalid User"
            })
        }

        const passCheck = await bcrypt.compare(body.password, validUser.password);
        if(!passCheck){
            return res.json({
                msg: "Wrong password"
            })
        }

        var token = jwt.sign({email: validUser.email}, SECRET)
        return res.json({
            token,
            message: "Logged in"
        })
    }

    catch(err){
        res.status(500).json({
            msg: "error is: " + err
        })
    }
})

router.put('/update',authMiddleware, async(req,res) => {
    try{
        const updates = req.body;
        const id = updates.id;

        const {success} = updateDataSchema.safeParse(updates);
        if(!success){
            return res.json({
                msg: "Wrong Inputs"
            })
        }

        if(updates.password)
        {
            updates.password = await bcrypt.hash(updates.password,10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates);

        if(!updatedUser)
        {
            return res.status(404).json({
                msg: "User not found"
            })
        }
    }

    catch(err){
        res.status(500).json({
            msg: "Internal server error",
            error: err.message
        })
    }
   
})

router.get("/search", async(req,res) => {
    //doubt 
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = router;