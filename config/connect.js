const  mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_KEY;


const connectToMongo = () => {
    mongoose.connect(dbUrl);


    mongoose.connection.on("connected", () => {
        console.log("connected to the database");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Database conection error:", err);

    });
    mongoose.connection.on("disconected", () =>{
        console.log("disconnected from database");
    });
};
module.exports = {connectToMongo}