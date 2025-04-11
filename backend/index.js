import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; 

dotenv.config();

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });

        app.get("/", (req, res) => {
            res.send("Hello World");
        });
    })
    .catch((err) => {
        console.log(`MongoDB connection failed: ${err}`);
    });
