import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const { MONGO_URI, PORT } = process.env;

if (!MONGO_URI || !PORT) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { dbName: "Events" });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
        process.exit(1); 
    }
};

connectToDB(); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
