import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
});



connectDB()

/* IIFE APPROACH:

import express from "express";
const app = express();

//Mongodb Connection
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERR: ",error);
            throw error
        });

        app.listen(process.env.PORT,() => {
            console.log('App is listening on port ${process.env.PORT}');
            
        })
    } catch (error) {
        console.error("ERROR:", error);
        throw err;
        
    }
})()

*/