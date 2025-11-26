//Importar mongoose para trabajar con MongoDB
const mongoose=require('mongoose');

// Definir campos de productos
const productosSchema =new mongoose.Schema({
    nombre:String,
    precio:Number,
    cantidad:Number
});
// Crear y exportar el modelo 'Producto' basado en el esquema
module.exports = mongoose.model('Producto',productosSchema);