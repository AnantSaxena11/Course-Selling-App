const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const adminAuth = async function(req,res,next){
    const token = req.headers.token;
    const payload = jwt.verify(token,process.env.ADMIN_JWT_SECRET);
    if(payload)
    {
        req.adminId = payload.id;
        next();
    }
    else
    {
        res.status(403).json({
            message : "You are not signed in"
        })
    }
}
module.exports = {
    adminAuth : adminAuth
}