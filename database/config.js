const mongoose = require ('mongoose');

const dbconnection = async () => {

    try {
        
        await mongoose.connect(process.env.mongoDB_cnn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        })
        console.log('Conexion exitosa con la base de datos');


    } catch (error) {
        console.log(error);
        throw new Error('Error de inicializacion de la base de datos')
    }
}

module.exports = {
    dbconnection,

}