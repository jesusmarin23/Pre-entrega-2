const express = require('express');
const {Router} = express;
const ContenedorProductosMongoDB = require('../persistencia/ContenedorProductosMongoDB.js');
const authAdmin = require('../middleware/authAdmin.js');

const routerProductosMongoDB = new Router();

const persistenciaProductos = new ContenedorProductosMongoDB();

//rutas productos

//GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routerProductosMongoDB.get('/:id?', async (req, res) => {
    const {id} = req.params;
    if (id) {
        const product = await persistenciaProductos.getById(id);
        res.json(product);
    } else {
        const products = await persistenciaProductos.getAll();
        res.json(products);
    }
});

//POST: '/' - Para incorporar productos al listado (disponible para administradores)
//En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

routerProductosMongoDB.post('/', authAdmin, async (req, res) => {
        const product = req.body;
        const newProduct = await persistenciaProductos.save(product);
        res.json(newProduct);
});

//PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductosMongoDB.put('/:id', authAdmin, async (req, res) => {
        const {id} = req.params;
        const product = req.body;
        const newProduct = await persistenciaProductos.updateById(id, product);
        res.json(newProduct);
});

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductosMongoDB.delete('/:id', authAdmin, async (req, res) => {
        const {id} = req.params;
        const product = await persistenciaProductos.deleteById(id);
        res.json(product);
});

module.exports = routerProductosMongoDB