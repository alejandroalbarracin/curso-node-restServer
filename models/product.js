const {Schema, model} = require('mongoose');


//campos que vamos a necesitar para la tabla product
const ProductSchema = Schema({
    name:{
        type:String,
        required: [true, 'El nombre es obligatorio'],
        unique: true 
    },
    stateProduct:{
        type:Boolean,
        default: true,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'true',
    },
    price:{
        type:Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: 'true'
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default: true
    },
    productCode:{
        type:String,
        required: [true, 'El Codigo del PRODUCTO es obligatorio'],
        unique: true 
    },
    img:{
        type: String,
    },
    features:{
        type:String,
    },
    rating:{
        type:Number,
        default: 0
    },
    existence:{
        type: Number,
        default: 0
    },
    dateCreate:{
        type:Date,
        default: Date.now
    },
    dateUpdate:{
        type:Date,
        default: Date.now
    }



})
// actualiza la fecha de modificacion del producto 
ProductSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.$set) {
        update.$set.dateUpdate = new Date();
    } else {
        update.dateUpdate = new Date();
    }
    next();
});

ProductSchema.methods.toJSON = function() {
    const {__v, stateProduct, ...data} = this.toObject();
    
    return data;

}






module.exports = model ('Product', ProductSchema)