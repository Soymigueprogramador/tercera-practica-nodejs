// Importando dependencias.
import mongoose from "mongoose";

// Creando el esquema para los libros.
const librosSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    genre: String,
    description: String,
    publisher: String,
    year: Number,
    publication_day: Number,
    publication_month: Number,
    publication_year: Number,
})

// Creando el modelo definido
const lobros = mongoose.model('libros', librosSchema)

// Exportando el modelo
export default librosSchema