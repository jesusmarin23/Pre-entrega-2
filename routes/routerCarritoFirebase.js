const express = require('express');
const { Router } = express;
const ContenedorCarritoFirebase = require('../persistencia/ContenedorCarritoFirebase.js');

const routerCarritoFirebase = new Router();

const persistenciaCarritoFirebase = new ContenedorCarritoFirebase();

//rutas carrito

//POST: '/' - Crea un carrito y devuelve su id.
routerCarritoFirebase.post('/', async (req, res) => {
    const carrito = req.body;
    const newCarrito = await persistenciaCarritoFirebase.saveCarrito(carrito);
    res.json(newCarrito);
});

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routerCarritoFirebase.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const carrito = await persistenciaCarritoFirebase.getProductosCarrito(id);
    res.json(carrito);
});

//DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCarritoFirebase.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const carrito = await persistenciaCarritoFirebase.deleteCarrito(id);
    res.json(carrito);
});

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito.
routerCarritoFirebase.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const newProducto = await persistenciaCarritoFirebase.addProductoCarrito(id, producto);
    res.json(newProducto);
});

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCarritoFirebase.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const producto = await persistenciaCarritoFirebase.deleteProductoCarrito(id, id_prod);
    res.json(producto);
});

module.exports = routerCarritoFirebase;