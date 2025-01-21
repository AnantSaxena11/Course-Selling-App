const {Router} = require("express");
const{ purchase, allcourse } = require("../controllers/courseController.js");
const {userAuth} = require("../middleware/userAuth.js");
const courseRouter = Router();
courseRouter.post('/purchase',userAuth,purchase);
courseRouter.get('/preview',userAuth,allcourse);
module.exports = {
    courseRouter : courseRouter
}