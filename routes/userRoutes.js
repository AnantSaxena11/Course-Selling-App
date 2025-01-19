const {Router} = require("express")
const { signup, signin, myPurchase } = require("../controllers/userController");
const {userAuth} = require("../middleware/userAuth.js")
const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/purchases",userAuth, myPurchase);

module.exports = {
    userRouter : userRouter
}
