const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosCollection = "productos";

const productosSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const URL = "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/ecommerce?retryWrites=true&w=majority";

const connect = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("conectados correctamente")

    } catch (error) {
        console.log("error al conectarse a la base de datos", error)
    }
}

module.exports = { connect, productosCollection, productosSchema };