const fs = require('fs');

//contendor
class ContenedorProductos {
    constructor(file) {
        this.file = file
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    async save(product) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const products = JSON.parse(data)
            //busco el ultimo id para generar un nuevo id sumandole 1
            const lastId = products[products.length - 1].id
            const newProduct = { ...product, id: lastId + 1, timestamp: new Date().toLocaleString() }
            products.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return newProduct
        } catch (error) {
            //si no existe el archivo, creamos por primera vez la lista de productos
            const newProduct = { ...product, id: 1 }
            await fs.promises.writeFile(this.file, JSON.stringify([newProduct], null, 2))
            return newProduct
        }
    }


    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            //Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
            if (!product) {
                return { error: 'producto no encontrado' }
            } else {
                return product
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }

    async updateById(id, product) {
        try {
            const products = await this.getAll()
            //verifico si existe ese id sino mando error
            const productToUpdate = products.find((product) => product.id === id)
            if (!productToUpdate) {
                throw new Error('No fue encontrado un producto con ese id')
            }
            //actualizo el producto
            const updatedProduct = { ...productToUpdate, ...product }
            //busco el indice del producto a actualizar
            const index = products.findIndex((product) => product.id === id)
            //actualizo el producto en el array
            products[index] = updatedProduct
            //guardo el array en el archivo
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return updatedProduct
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }



    async deleteById(id) {
        try {
            const products = await this.getAll()
            //verifico si existe ese id sino mando error
            const product = products.find((product) => product.id === id)
            if (!product) {
                throw new Error('No fue encontrado un producto con ese id')
            }
            //filtro el array de productos y me quedo con los que no tengan el id que quiero eliminar
            const newProducts = products.filter((product) => product.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(newProducts, null, 2))
        } catch (error) {
            console.log('Error en deleteById: ', error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        } catch (error) {
            console.log('Error en deleteAll: ', error)
        }
    }
}

//exporto
module.exports = ContenedorProductos