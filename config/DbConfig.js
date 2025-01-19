const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async function connection(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("Error", error)
    }
}
module.exports = {
    connectDB : connectDB
}
