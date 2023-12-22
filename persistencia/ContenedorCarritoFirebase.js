const db = require('../config/firebaseConfig');
const fs = require('fs');

//contendor
class ContenedorCarritoFirebase {
    constructor() {
        this.carritos = db.collection('carritos');
    }

   //creo un carrito con su id, timestamp y array de productos vacio y lo guardo en el archivo y devuelve su id
    async saveCarrito() {
        try {
            const carrito = {
                id: Date.now(),
                timestamp: new Date(),
                productos: []
            }
            await this.carritos.doc(carrito.id.toString()).set(carrito)
            return carrito.id
        } catch (error) {
            console.log('Error en saveCarrito: ', error)
        }
    }

    //obtengo todos los carritos
    async getAllCarritos() {
        try {
            const carritos = await this.carritos.get();
            const carritosArray = [];
            carritos.forEach((carrito) => {
                carritosArray.push(carrito.data())
            })
            return carritosArray
        } catch (error) {
            console.log('Error en getAllCarritos: ', error)
        }
    }

    //DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteCarrito(id) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                await this.carritos.doc(id.toString()).delete();
                return carrito.data()
            }
        } catch (error) {
            console.log('Error en deleteCarrito: ', error)
        }
    }

    //GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    async getProductosCarrito(id) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                return carrito.data().productos
            }
        } catch (error) {
            console.log('Error en getProductosCarrito: ', error)
        }
    }

    //POST: '/:id/productos' - Agrega un producto al carrito. Si el producto ya existe en el carrito, se actualiza la cantidad.
    async addProductoCarrito(id, producto) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoData = carrito.data()
                const productoExistente = carritoData.productos.find((prod) => prod.id === producto.id)
                if (productoExistente) {
                    productoExistente.cantidad += producto.cantidad
                } else {
                    carritoData.productos.push(producto)
                }
                await this.carritos.doc(id.toString()).update(carritoData)
                return carritoData
            }
        } catch (error) {
            console.log('Error en addProductoCarrito: ', error)
        }
    }

    //DELETE: '/:id/productos/:idProducto' - Elimina un producto del carrito.
    async deleteProductoCarrito(id, idProducto) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoData = carrito.data()
                const productoExistente = carritoData.productos.find((prod) => prod.id === idProducto)
                if (!productoExistente) {
                    return { error: 'producto no encontrado' }
                } else {
                    carritoData.productos = carritoData.productos.filter((prod) => prod.id !== idProducto)
                    await this.carritos.doc(id.toString()).update(carritoData)
                    return carritoData
                }
            }
        } catch (error) {
            console.log('Error en deleteProductoCarrito: ', error)
        }
    }
}

module.exports = ContenedorCarritoFirebase;