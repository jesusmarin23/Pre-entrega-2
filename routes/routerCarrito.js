const express = require('express');
const { Router } = express
const ContenedorCarrito = require('../persistencia/ContenedorCarrito.js')

const routerCarrito = new Router();

const persistenciaCarrito = new ContenedorCarrito('./bd/carritos.txt');

//rutas carrito

//POST: '/' - Crea un carrito y devuelve su id.
routerCarrito.post('/', async (req, res) => {
    const carrito = req.body
    const newCarrito = await persistenciaCarrito.saveCarrito(carrito)
    res.json(newCarrito)
})

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const carrito = await persistenciaCarrito.getProductosCarrito(Number(id))
    res.json(carrito)
})

//DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params
    const carrito = await persistenciaCarrito.deleteCarrito(Number(id))
    res.json(carrito)
})

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito.
routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const producto = req.body
    const newProducto = await persistenciaCarrito.addProductoCarrito(Number(id), producto)
    res.json(newProducto)
})

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params
    const producto = await persistenciaCarrito.deleteProductoCarrito(Number(id), Number(id_prod))
    res.json(producto)
})

module.exports = routerCarrito;