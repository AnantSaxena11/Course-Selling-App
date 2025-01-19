const {Router} = require("express");
const{ purchase, allcourse } = require("../controllers/courseController.js");

const courseRouter = Router();

courseRouter.post('/purchase',purchase);
courseRouter.get('/preview',allcourse);

module.exports = {
    courseRouter : courseRouter
}