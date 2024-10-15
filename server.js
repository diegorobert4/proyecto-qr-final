const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Cambia esto si necesitas un puerto diferente

// Middleware
app.use(cors()); // Permite las solicitudes CORS
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes JSON

// Datos de ejemplo (simulando una base de datos)
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Rutas de la API
app.get('/api/items', (req, res) => {
    // Devuelve todos los items
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Asegúrate de que el id es un número
    const item = items.find(i => i.id === id);
    
    if (item) {
        res.json(item); // Devuelve el item encontrado
    } else {
        res.status(404).json({ error: 'Item no encontrado' }); // Maneja el error si no se encuentra el item
    }
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1; // Asigna un nuevo ID
    items.push(newItem); // Agrega el nuevo item al "almacenamiento"
    res.status(201).json(newItem); // Devuelve el nuevo item creado
});

app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Asegúrate de que el id es un número
    const index = items.findIndex(i => i.id === id);
    
    if (index !== -1) {
        const updatedItem = { id, ...req.body }; // Actualiza el item
        items[index] = updatedItem; // Reemplaza el item en el "almacenamiento"
        res.json(updatedItem); // Devuelve el item actualizado
    } else {
        res.status(404).json({ error: 'Item no encontrado' }); // Maneja el error si no se encuentra el item
    }
});

app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Asegúrate de que el id es un número
    const index = items.findIndex(i => i.id === id);
    
    if (index !== -1) {
        items.splice(index, 1); // Elimina el item del "almacenamiento"
        res.status(204).send(); // Devuelve un estado 204 No Content
    } else {
        res.status(404).json({ error: 'Item no encontrado' }); // Maneja el error si no se encuentra el item
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
