
const express =require('express');// Importar Express para crear el servidor y rutas
const router =express.Router();// Crear un enrutador de Express para organizar las rutas
const Producto =require('../models/Producto');// Importar el modelo Producto para interactuar con la base de datos
const mongoose = require('mongoose');


function validarId(id){return mongoose.Types.ObjectId.isValid(id);}


//GET
router.get('/',async(req,res)=>{//Ruta para TODOS los productos
const productos=await Producto.find();// Buscar todos los productos en la BD
res.json(productos);
});

// POST
router.post('/',async(req,res)=>{//Ruta para TODOS los productos
const {nombre,precio,cantidad}=req.body;//toma los datos
if(!nombre||precio==null||cantidad==null){
    return res.status(400).json({error:'Todos los campos son obligatorios'});
}
const nuevo =new Producto({nombre,precio,cantidad});
await nuevo.save();// Guardar el producto
res.json(nuevo);
});


// PUT
router.put('/:id',async(req,res)=>{
    const{id}=req.params; // Obtener el ID
    if(!validarId(id))return res.status(400).json({error:'ID inválido'});
    const {nombre,precio,cantidad}=req.body;
    // Buscar y actualizar el producto,
    const actualizado=await Producto.findByIdAndUpdate(id,{nombre,precio,cantidad},{new:true});

    if(!actualizado) return res.status(404).json({error:'Producto no encontrado'});
    res.json(actualizado);
});

// DELETE
router.delete('/:id',async(req,res)=>{
     const{id}=req.params;
     if(!validarId(id))return res.status(400).json({error:'ID inválido'});
      // Buscar y eliminar 
      const eliminado = await Producto.findByIdAndDelete(id) 
       if(!eliminado) return res.status(404).json({error:'Producto no encontrado'});
       res.json({mensaje:'Producto eliminado'});
});
module.exports = router;