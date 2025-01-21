const { purchaseModel } = require("../models/purchaseSchema.js")
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
    const userId = req.userId;
    try {
        const userCourses = await purchaseModel.find({
            userId: userId
        })

        res.json({
            message: "All the courses of the users",
            userCourses: userCourses
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    purchase: purchase,
    allcourse: allCourse
}
