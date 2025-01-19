const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userAuth = async function(req,res,next){
    const token = req.headers.token;
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    if(payload)
    {
        req.userId = payload.id;
        next();
    }
}
module.exports = {
    userAuth : userAuth
}

