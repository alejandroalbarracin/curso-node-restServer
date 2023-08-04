const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

const allowedCollections = [
    'user',
    'categories',
    'products',
    'productsbycategory',
    'role'
];


// buscar por usuario id y nombre 
const userSearch = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or:[{name: regex}, {email: regex}],
        $and: [{stateUser: true}]
    });

    res.json({results: users});

};

//buscar por categoria id y nombre 
const categorySearch = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const category = await Category.findById(termino);
        return res.json({
            results: (category) ? [category] : []
        });
    };

    const regex = new RegExp(termino, 'i');

    const categories = await Category.find({name: regex, stateCategory: true});

    res.json({results: categories});
};



//buscar por id, nombre del producto, codigo producto
const productSearch = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const product = await Product.findById(termino).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    

    const products = await Product.find({
        $or: [{name: regex}, {productCode: regex} ],
        $and: [{stateProduct: true}]
    }).populate('category', 'name')

    res.json({
        results: products
    })

};

//buscar por categoria del objectbyid todas las categorias asignadas a el producto 
const searchProductsByCategory = async( termino = '', res = response) => {
 
    const isMongoID = ObjectId.isValid( termino )
 
    try {
        if ( isMongoID ) {
            const product = await Product.find( { category: new ObjectId( termino ) } )
                                            .populate('category', 'name')
     
            return res.json( {
                results: ( product ) ? [ product ] : []
            })
        }
     
        const regex = new RegExp( termino, 'i' )
     
        const categories = await Category.find({ name: regex})
        
        const products = await Product.find({
            $or: [...categories.map( category => ({
                category: category._id
            }))]
        }).populate('category', 'name')
     
     
        res.json({
            results: products
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'no existe una categoria con es nombre'
        })
    }

 
}





const search = (req, res= response ) => {

    const {colection ,termino} = req.params;

    if (!allowedCollections.includes(colection)) {
        return res.status(400).json({
            msg:`Las colecciones de busqueda permitidas son ${allowedCollections}`
        })
    }

    switch (colection) {
       case 'user':
        userSearch(termino, res)
        break;
       case 'categories':
        categorySearch(termino, res)
        break;
       case 'products':
        productSearch(termino, res)
        break;
       case 'productsbycategory':
        searchProductsByCategory(termino, res)
        break;

        default:
            res.status(500).json({
                msg:'Esta busqueda no tiene sentido'
            })
    }


}


module.exports ={
    search
}