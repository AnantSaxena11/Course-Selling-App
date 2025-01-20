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
}
module.exports = {
    adminAuth : adminAuth
}