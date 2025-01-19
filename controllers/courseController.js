const purchase = async function (req, res) {
    res.json({
        message: "purchase"
    })
}

const allCourse = async function (req, res) {
    res.json({
        message: "All course"
    })
}
module.exports = {
    purchase: purchase,
    allcourse: allCourse
}
