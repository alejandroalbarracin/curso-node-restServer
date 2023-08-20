const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response, request } = require("express");
const { uploadFile } = require("../helpers/uploadFile");
const Product = require("../models/product");
const User = require("../models/user");
//const mongoose = require('mongoose');

const uploadFiles = async (req, res = response ) => {


    try {
        //como nos pide el archivo utilizamos el req.files, no vamos a agregar mas extenciones entonces no la llamamos y 
        //folder tampoco lo vamos a llamar porque no lo vamos a almacenar en otra parte entonces queda tambien vacio
        
        //const nameFile =  await uploadFile(req.files, ['txt'], 'texto')
        
        const nameFile =  await uploadFile(req.files, undefined, 'imgs')
        res.json({msg: nameFile})
        //para fines didacticos se agrega un nuevo tipo de extensio de archivo que es txt         res.json({nameFile})
       
        
    } catch (error) {
        res.status(400).json({error})     
    }
    
}


const updateImage = async  (req, res = response ) => {

    const {id, colection } = req.params;

    let modelo;

    switch (colection) {
        case 'users':
            
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'el Usuario que esta intentando realizar esta accion no es valido'
                })
            }

            break;
        
        case 'products':
            
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con es Identificador'
                })
            }
    
        break;
    
        default:
            return res.status(500).json({ msg: 'no esta validado esto'})
    }


    //limpiar imagenes previas 

    try {
        if (modelo.img) {
            // borrar imagen del servidor pero se debe validar el path por eso se debe importar 
            const pathImg = path.join(__dirname, '../uploads', colection, modelo.img); 
            // validar si existe carpeta o imag
            if(fs.existsSync(pathImg)){
                fs.unlinkSync(pathImg)
            }
        }
        
    } catch (error) {
        throw new Error (error)
    }


    const nameFile =  await uploadFile(req.files, undefined, colection );

    modelo.img = nameFile

    await modelo.save();

    res.json(modelo)


}

const updateImageCloudinary = async  (req, res = response ) => {

    const {id, colection } = req.params;

    let modelo;

    switch (colection) {
        case 'users':
            
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'el Usuario que esta intentando realizar esta accion no es valido'
                })
            }

            break;
        
        case 'products':
            
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con es Identificador'
                })
            }
    
        break;
    
        default:
            return res.status(500).json({ msg: 'no esta validado esto'})
    }


    //limpiar imagenes previas 

    try {
        if (modelo.img) {
          const arrName = modelo.img.split('/');
          const nameurl = arrName[arrName.length - 1];
          const [ publicId ] = nameurl.split('.');
          cloudinary.uploader.destroy(publicId)
        }

        const {tempFilePath} = req.files.archivo

        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        
        modelo.img = secure_url
        
        await modelo.save();
        
        res.json(modelo)
        
    } catch (error) {
        throw new Error (error)
    }

}


const showImage = async (req, res = response) => {
   
    const {id, colection } = req.params;

    let modelo;

    switch (colection) {
        case 'users':
            
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'el Usuario que esta intentando realizar esta accion no es valido'
                })
            }

            break;
        
        case 'products':
            
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con es Identificador'
                })
            }
    
        break;
    
        default:
            return res.status(500).json({ msg: 'no esta validado esto'})
    }


    //limpiar imagenes previas 

    try {
        if (modelo.img) {
            // borrar imagen del servidor pero se debe validar el path por eso se debe importar 
            const pathImg = path.join(__dirname, '../uploads', colection, modelo.img); 
            // validar si existe carpeta o imag
            if(fs.existsSync(pathImg)){
                return res.sendFile(pathImg)
            }
        }
        
    } catch (error) {
        throw new Error (error)
    }

 
    const pathImg = path.join(__dirname, '../assets/no-image.jpg');  

    res.sendFile(pathImg)

}




module.exports = {
    uploadFiles,
    updateImage,
    showImage,
    updateImageCloudinary,

}