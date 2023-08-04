const { response } = require("express");
const mongoose = require('mongoose');
const {Product} = require ('../models')



//obtener productos paginado - populate
const getProducts = async (req, res = response) => {

    const {limitvalue = 10} = req.query;
    const {initialValue = 0} = req.query;
    const query = {stateProduct: true}
    
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate({
            path:'category',
            select:'name'
        })
        .skip(Number(initialValue))
        .limit(Number(limitvalue))
    ]);

    const productName = products.map((Product) => ({
        ...Product.toObject(),
        user: Product.user.name,
        dateCreate: products.dateCreate,
        dateUpdate: products.dateUpdate,
    }))

    

    res.json({
        total,
        products:productName,
    })

}


//obtener categoria - populate 

const getProductId = async (req, res = response) => {

    const {id} = req.params

    try {
        const getProduct = await Product.findById(id);
        
        if(!getProduct){
            return res.status(400).json({
                msg:`El id ${id} no es valido o no existe`
            })
        }

        return res.status(200).json(getProduct)

    } catch (error) {
        return res.status(500).json({
            msg: 'El id del producto no es valido'
        })
    }

}

//crear categorias 

const createProduct = async (req, res = response) => {

    const {stateProduct, user, ...body} = req.body
    
    const productDB = await Product.findOne({name: body.name,});

    try {
        if (productDB){
            return res.status(400).json({
                msg: `El ${productDB.name} ya existe`
            })
        };
    
        //generar la data a guardar 
    
        const data = {
            ...body,
            name: body.name.charAt(0).toUpperCase() + body.name.slice(1).toLowerCase(),
            productCode: body.productCode.toUpperCase(),
            user: req.user._id,
        };
    
        const product = new Product(data);
    
        //guardar en la base de datos 
        
        await product.save()
    
        res.status(201).json(product)
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error al guardar el producto: El producto o el codigo ya fueron creados',
        });
    }

}   


//actualizar categoria Solo si tiene permiso 

const putProduct = async (req, res = response ) => {
    const {id} = req.params

    //pasar lo que no vamos a actualizat 
    const {stateProduct, user, dateCreate, ...data} = req.body
    
    // Comprobar si se están actualizando el nombre o el productCode
    if (data.name) {
        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    };

    if (data.productCode) {
        data.productCode = data.productCode.toUpperCase();
    };

    // Agregar la fecha de actualización
    data.dateUpdate = new Date();

    // Realizar la actualización del producto
    const product = await Product.findByIdAndUpdate(id, data, {new:true})


    res.json({
        product
    })


};



//borrar categoria 
const deleteProduct = async (req, res = response ) => {

    const {id} = req.params

    //dejar inactivo el producto no elimna 
    const inactivo = await Product.findByIdAndUpdate(id, {stateProduct: false}, {new:true})

    res.json({
        inactivo,
        msg:'El producto esta inactivo'
    })

}

module.exports = {
    getProducts,
    getProductId,
    createProduct,
    putProduct,
    deleteProduct,
}