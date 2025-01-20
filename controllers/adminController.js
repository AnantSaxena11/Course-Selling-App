const {adminModel} = require('../models/adminSchema.js')
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const signup = async function(req,res){
    const requiredSchema = z.object({
        email: z.string().email(),
        password: z.string()
            .min(8, { message: "Password must be a minimum of length 8" })
            .max(16, { message: "Password must be a maximum of 16 characters" })
            .refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lowercase letter" })
            .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number" })
            .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" })
            .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), { message: "Password must contain at least one special character" }),
        firstname: z.string(),
        lastname: z.string()
    });
    const parsedDatawithSuccess = requiredSchema.safeParse(req.body);
    if (!parsedDatawithSuccess.success) {
        return res.status(400).json({
            message: "Validation Failed",
            error: parsedDatawithSuccess.error.errors
        })
    }
    const { email, password, firstname, lastname } = req.body;
    try {
        const duplicate = await adminModel.findOne({
            email: email
        });
        if (duplicate) {
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        })
        res.status(201).json({
            message: "User Created Successfully",
            email: email,
            firstname: firstname,
            lastname: lastname
        })
    } catch (error) {
        console.log("Error", error);
    }
}
const signin = async function(req,res){
    const requiredSchema = z.object({
        email: z.string().email(),
        password: z.string()
            .min(8, { message: "Password must be a minimum of length 8" })
            .max(16, { message: "Password must be a maximum of 16 characters" })
            .refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lowercase letter" })
            .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number" })
            .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" })
            .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), { message: "Password must contain at least one special character" })
    });
    
    const parsedDatawithSuccess = requiredSchema.safeParse(req.body);
    if (!parsedDatawithSuccess.success) {
        return res.status(400).json({
            message: "Validation Failed",
            error: parsedDatawithSuccess.error.errors
        });
    }

    const { email, password } = req.body;

    try {
        const user = await adminModel.findOne({
            email: email
        });

        if (!user) {
            return res.status(404).json({
                message: "Admin does not exist"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({
                id: user._id
            }, process.env.ADMIN_JWT_SECRET);

            return res.json({
                message: "Login Successful",
                token: token // Optional: Return the token for client usage
            });
        } else {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            message: "An error occurred while processing your request"
        });
    }
}

const addcourse = async function(req,res){
    res.json({
        message : "Course added success"
    })
}


const updatecourse = async function(req,res){
    res.json({
        message : "course updated"
    })
}

const viewcourse = async function(req,res){
    res.json({
        message : "viewing all the courses"
    })
}

module.exports = {
    signup : signup,
    signin : signin,
    addcourse : addcourse,
    updatecourse : updatecourse,
    viewcourse : viewcourse
}
