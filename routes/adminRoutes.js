const { Router } = require("express")
const { signin, signup, addcourse, viewcourse, updatecourse } = require("../controllers/adminController.js");
const { adminAuth } = require("../middleware/adminAuth.js");
const adminRouter = Router();
adminRouter.post('/signup', signup);
adminRouter.post('signin', signin);
adminRouter.post('/add', adminAuth, addcourse);
adminRouter.put('/update', adminAuth, updatecourse);
adminRouter.get('/preview', adminAuth, viewcourse);
module.exports = {
    adminRouter: adminRouter
}