// Importando Archivos y dependencias.
import express from "express"; 
import librosSchema from "../models/libros.models.js"

// Iniciando express.
const router = express.Router()

// Middlewars para verificar si el libro existe. 
const getLibros = async (req, res, next) => {
    let book;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'El ID del libro no es válido' })
    }
    try {
        libro = await libro.findById(id);
        if ( !libro ) {
            return res.status(404).json({ message: 'El libro no fue encontrado' })
        }
    } catch ( error ) {
        return res.status(500).json({ message: error.message })
    }
    res.libro = libro;
    next()
}

// Ruta para obtener todos los libros. 
router.get('/', async ( req, res ) => {
    try {
        const libros = await librosSchema.find()
        console.log(' GET ALL    ', libros)
        if ( libros.length === 0 ) {
            return res.status(204).json({  })
        }
        res.json(libros)
    }
    catch ( error ) {
        res.status(500).json({ message: 'Error en el servidor' })
    }
})

// aGREGANDO UN NUEVO LIBRO. 
router.post('/', async (req, res) => {
    const { title, author, genre, description, publisher, year, publication_day, publication_month, publication_year } = req.body;
    if (!title || !author || !genre || !description || !publisher || !year || !publication_day || !publication_month || !publication_year) {
        return res.status(400).json({ message: 'A este libro le faltan algunos datos' });
    }
    const libro = new librosSchema({
        title,
        author,
        genre,
        description,
        publisher,
        year,
        publication_day,
        publication_month,
        publication_year,
    });
    try {
        const newLibro = await libro.save();
        console.log('POST', newLibro);
        res.status(201).json(newLibro);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el libro' });
    }
});

// Actualizando un libro. 
router.put('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        libro.title = req.body.title || libro.title;
        libro.author = req.body.author || libro.author;
        libro.genre = req.body.genre || libro.genre;
        libro.description = req.body.description || libro.description;
        libro.publisher = req.body.publisher || libro.publisher;
        libro.year = req.body.year || libro.year;
        libro.publication_day = req.body.publication_day || libro.publication_day;
        libro.publication_month = req.body.publication_month || libro.publication_month;
        libro.publication_year = req.body.publication_year || libro.publication_year;
        const actualizarLibro = await libro.save();
        res.json(actualizarLibro);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
});


// Actualizacion parcial de un libro. 
router.patch('/:id'), getLibros, async ( req, res ) => {
    if ( !req.body.title && !req.body.author && !req.body.genre && !req.body.description && !req.body.publisher && !req.body.year && !req.body.publication_day && !req.body.publication_month && !req.body.publication_year ) {
        res.status(400).json({ message: 'Si no ingresas todos los datos requeridos no se va a poder actializar los datos del libro' });
    }
    try {
        const libros = req.body
        libro.title = req.body.title || libro.title;
        libro.author = req.body.author || libro.author;
        libro.genre = req.body.genre || libro.genre
        libro.description = req.body.description || libro.description;
        libro.publisher = req.body.publisher || libro.publisher;
        libro.year = req.body.year || libro.year;
        libro.publication_day = req.body.publication_day || libro.publication_day;
        libro.publication_month = req.body.publication_month || libro.publication_month;
        libro.publication_year = req.body.publication_year || libro.publication_year;
        const actualizarLibro = await libro.save();
        res.json(actualizarLibro);
    } 
    catch ( error ) {
        res.status(500).json({ message: 'Error al actualizar el libro' })
    }
}

// Eliminar un libro de la base de datos. 
router.delete('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        await libro.deleteOne({ _id: libro._id });
        res.json({ message: `El libro con el título ${libro.title} fue eliminado con éxito` });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar el libro con el título ${libro.title}` });
    }
});

export default router;