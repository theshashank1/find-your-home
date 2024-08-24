
const mongoose = require("mongoose");

const connectDB = async ( url = "mongodb+srv://shashankgunda03:4vBVeo9bkDnalZ9M@find-your-home.9cq5e.mongodb.net/find-your-home") => {
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