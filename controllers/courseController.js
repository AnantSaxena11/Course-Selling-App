const { courseModel } = require("../models/courseSchema.js")
const purchase = async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const purchaseDetail = await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    if (purchaseDetail) {
        res.json({
            message: "purchase successfull",
            purchaseid: purchaseDetail._id
        })
    }
    else {
        res.json({
            message: "purchase failed try again later"
        })
    }
}

const allCourse = async function (req, res) {
    
    try {
        const Courses = await courseModel.find({
        })

        res.json({
            message: "All the courses",
            Courses: Courses
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    purchase: purchase,
    allcourse: allCourse
}
