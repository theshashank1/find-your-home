
const mongoose = require("mongoose");

const connectDB = async ( url = "mongodb://localhost:27017/find-your-home") => {
    try {
        await mongoose.connect(url);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(`There is an error found in connecting, ${error}`);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Database is disconnected successfully");
    } catch (error) {
        console.log(`There is an error found in disconnecting, ${error}`);
    }
};


module.exports = { connectDB, disconnectDB };