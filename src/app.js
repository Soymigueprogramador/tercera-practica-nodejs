// Importacion de archivos y dependencias. 
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import librosRouter from './router/libros.router.js';

config(); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/libros", librosRouter)



app.listen(PORT, () => {
    console.log('Mi proyecto esta levantado en el puerto ${PORT}') 
})