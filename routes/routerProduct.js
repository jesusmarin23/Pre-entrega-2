const express = require('express');
const { Router } = express
const ContenedorProductos = require('../persistencia/ContenedorProductos.js')
const authAdmin = require('../middleware/authAdmin.js')

const routerProductos = new Router();

const persistenciaProductos = new ContenedorProductos('./bd/productos.txt');

//rutas productos

//GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routerProductos.get('/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
        const product = await persistenciaProductos.getById(Number(id))
        res.json(product)
    } else {
        const products = await persistenciaProductos.getAll()
        res.json(products)
    }
})

//POST: '/' - Para incorporar productos al listado (disponible para administradores)
//En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

routerProductos.post('/', authAdmin, async (req, res) => {
        const product = req.body
        const newProduct = await persistenciaProductos.save(product)
        res.json(newProduct)
})

//PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductos.put('/:id', authAdmin, async (req, res) => {
        const { id } = req.params
        const product = req.body
        const newProduct = await persistenciaProductos.updateById(Number(id), product)
        res.json(newProduct)
})

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete('/:id', authAdmin, async (req, res) => {
        const { id } = req.params
        const product = await persistenciaProductos.deleteById(Number(id))
        res.json(product)
})

module.exports = routerProductos;







