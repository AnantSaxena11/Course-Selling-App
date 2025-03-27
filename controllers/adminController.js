const { adminModel } = require('../models/adminSchema.js');
const { courseModel } = require('../models/courseSchema.js');
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const signup = async function (req, res) {
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
const signin = async function (req, res) {
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

const addcourse = async function (req, res) {
    const courseSchema = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string()
    })

    const parsedDatawithSuccess = courseSchema.safeParse(req.body);
    if (!parsedDatawithSuccess) {
        return res.json({
            message: "Course details formating is wrong"
        })
    }

    const creatorId = req.adminId;
    const { title, description, price, imageUrl } = req.body;
    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        })
        res.status(201).json({
            message: "Course added successfully",
            courseId: course._id
        })
    } catch (error) {
        console.log("error", error)
    }
}


const updateCourse = async function (req, res) {
    const adminId = req.adminId;
    const { new_title, new_description, new_price, new_imageUrl, courseId } = req.body;

    if (!courseId || !adminId) {
        return res.status(400).json({ message: "Missing courseId or adminId" });
    }
    try {
        const filter = {
            _id: courseId,
            creatorId: adminId
        };
        const update = {
            title: new_title,
            description: new_description,
            price: new_price,
            imageUrl: new_imageUrl

        };

        const result = await courseModel.updateOne(filter, update);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found or not authorized to update"
            });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({
                message: "No changes were made as the data is identical",
                courseId: courseId
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            courseId: courseId
        });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const viewcourse = async function (req, res) {
    const creatorId = req.adminId;
    try {
        const details = await courseModel.find({
            creatorId: creatorId
        })
        res.json({
            details
        })
    } catch (error) {
        res.json({
            message: "Course not there in the database"
        })
    }
}

module.exports = {
    signup: signup,
    signin: signin,
    addcourse: addcourse,
    updateCourse: updateCourse,
    viewcourse: viewcourse
}
