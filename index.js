import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./src/routes/user.js";
import { recipesRouter } from "./src/routes/recipes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.get('/',(req,res)=>{
    res.send("Hello Backend App ")
})

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGOURI,{
            useNewUrlParser: true, useUnifiedTopology: true
            });
            console.log('DB Connected Susessfully')
    } catch (error) {
       console.log(`Error :  ${error.message}`) 
    }
}
dbConnect()

app.listen(PORT, () => console.log(`Server started - Port ${PORT}`));