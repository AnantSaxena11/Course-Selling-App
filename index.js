const express = require('express');
const dotenv = require("dotenv")
dotenv.config();
const { connectDB } = require("./config/DbConfig")
const { userRouter } = require("./routes/userRoutes.js")
const { courseRouter } = require("./routes/courseRoutes.js")
const { adminRouter } = require("./routes/adminRoutes.js")
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);
const startServer = async () => {
    try {
        await connectDB();
        console.log("Connection establishment successful starting server .... 🚀");
        app.listen(PORT, function (req, res) {
            console.log(`The server is open at port number ${PORT}`);
        })
    } catch (error) {
        console.log("Failed to connect to the database. Server not started.", error);
    }
}
startServer();
