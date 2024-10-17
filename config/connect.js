const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_KEY;

const connectToMongo = async () => {
    try {
        await mongoose.connect(dbUrl); // Sem as opções useNewUrlParser e useUnifiedTopology
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Termina o processo se falhar a conexão
    }

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
    });
};

module.exports = { connectToMongo };
