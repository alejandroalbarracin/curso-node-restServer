
const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config');

class Server {
    //crear constructor para las propiedades

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:   '/api/auth',
            users:  '/api/users',
            categories: '/api/categories',
            products:'/api/products',
            search:'/api/search'
        }
      

        //conectar a la base datos 
        this.conectionDB()

        //middlewares
        this.middlewares();
        //rutas de app
        this.routes();
    }


    // funcion de conexion 

    async conectionDB(){
        await dbconnection()
    } 


    // crear middlewares
    middlewares () {

        //cors
        this.app.use(cors());

        //lectura y parseo del body 
        this.app.use(express.json());

        //directorio publico 
        this.app.use(express.static('public'))
    }

    // creacion de metodo para rutas

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'))
        this.app.use( this.paths.users, require('../routes/user'))
        this.app.use( this.paths.categories, require('../routes/categories'))
        this.app.use( this.paths.products, require('../routes/products'))
        this.app.use( this.paths.search, require('../routes/search') )
    }
    
        
   

    listen() {

        this.app.listen(this.port, () => {
            console.log(`corriendo en puerto`, this.port)
        })
    }

}

module.exports = Server