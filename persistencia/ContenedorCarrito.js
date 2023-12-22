const fs = require('fs');

//contendor
class ContenedorCarrito {
    constructor(file) {
        this.file = file
    }

   //creo un carrito con su id, timestamp y array de productos vacio y lo guardo en el archivo y devuelve su id
    async saveCarrito() {
        try {
            const carrito = {
                id: Date.now(),
                timestamp: new Date(),
                productos: []
            }
            const carritos = await this.getAllCarritos()
            carritos.push(carrito)
            await fs.promises.writeFile(this.file, JSON.stringify(carritos, null, 2))
            return carrito.id
        } catch (error) {
            console.log('Error en saveCarrito: ', error)
        }
    }

    //obtengo todos los carritos
    async getAllCarritos() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            //si no existe el archivo lo creo
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
            return []
        }
    }

    //DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteCarrito(id) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoFiltrado = carritos.filter((carrito) => carrito.id !== id)
                await fs.promises.writeFile(this.file, JSON.stringify(carritoFiltrado, null, 2))
                return carrito
            }
        } catch (error) {
            console.log('Error en deleteCarrito: ', error)
        }
    }

    //GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    async getProductosCarrito(id) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                return carrito.productos
            }
        } catch (error) {
            console.log('Error en getProductosCarrito: ', error)
        }
    }

    //POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    async addProductoCarrito(id, producto) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                carrito.productos.push(producto)
                await fs.promises.writeFile(this.file, JSON.stringify(carritos, null, 2))
                return carrito
            }
        } catch (error) {
            console.log('Error en addProductoCarrito: ', error)
        }
    }

    //DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductoCarrito(id, id_prod) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                const producto = carrito.productos.find((producto) => producto.id === id_prod)
                if (!producto) {
                    return { error: 'producto no encontrado' }
                } else {
                    const productoFiltrado = carrito.productos.filter((producto) => producto.id !== id_prod)
                    carrito.productos = productoFiltrado
                    await fs.promises.writeFile(this.file, JSON.stringify(carritos, null, 2))
                    return producto
                }
            }
        } catch (error) {
            console.log('Error en deleteProductoCarrito: ', error)
        }
    }
}

module.exports = ContenedorCarrito






   