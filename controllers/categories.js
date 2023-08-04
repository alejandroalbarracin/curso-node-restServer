const { response, request } = require("express");
const mongoose = require('mongoose');
const {Category} = require ('../models')



//obtener categorias - paginado -total -populate 

const categoryGet = async (req , res = response ) => {

    const {limitValue = 10} = req.query
    const {initialValue = 0} = req.query
    const query = {stateCategory: true}


    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate({
            path:'user',
            select:'name'
        })
        .skip(Number(initialValue))
        .limit(Number(limitValue))
    ]);

    const userName = categories.map((Category) => ({
        ...Category.toObject(),
        user: Category.user.name,
    }))

  

    res.json({
        total,
        categories:userName,
       
    })

}

//obtener categoria - pOpulate {}
const categoryGetId = async (req, res= response) => {

    const {id} = req.params
  
    try {
        const getcategory = await Category.findById(id)
        .populate('user','name')
        
        if (!getcategory) {
            return res.status(400).json({
                msg: `El id ${id} No existe`
            });
        }

        return res.status(200).json(getcategory);
       
        
    } catch (error) {
        return res.status(500).json({
            msg:'El id Proporcionado no es valido'
        })
    }

}




const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe.`
        })
    };

    // generar la data a guardar 

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // guardar en base de datos 

    await category.save();

    res.status(201).json(category)
    
}



// actualizar categoria 

const putCategory = async (req, res= response) => {

    const {id} = req.params;

    // Le pasamos lo que no vamos actualizar

    const{ stateCategory, user, ...data}= req.body

    //obtenemos el nombre del producto que vamos a cambiar y en mayuscula
    data.name = data.name.toUpperCase();
    //obtnemos el nombre del responsable del token que esta cambiando el producto 
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new:true}); //el new hace que se vea de inmediato el cambio


    res.json({
        category
    })
}





//borrar categoria 

const deleteCategory = async (req, res = response) => {

    const {id} = req.params;

    //no vamos a eliminar la categoria simplemente lo que vamos hacer es cambiarle de estado a false 

    const inactivo = await Category.findByIdAndUpdate(id, {stateCategory: false}, {new:true});

    res.json({
        inactivo,
        msg: 'La categoria se encuentra inactiva'
    })


}





module.exports = {
    createCategory,
    categoryGet,
    categoryGetId,
    putCategory,
    deleteCategory
}