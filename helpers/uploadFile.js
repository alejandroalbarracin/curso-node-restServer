const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionAllowed = ['png', 'jpg', 'gif'], folder=''  ) => {


    return new Promise ((resolve, reject) => {

        const {archivo} = files;

        const truncatedName = archivo.name.split('.');
        const extension = truncatedName[truncatedName.length - 1]

       

        if (!extensionAllowed.includes(extension)) {
       
            return reject('Ese tipo de extensiòn no es valida')
        }


        const tempName = uuidv4() + '.' + extension;

        uploadPath =  path.join(__dirname, '../uploads/', folder,  tempName ) ;

        archivo.mv(uploadPath, (err) => {
            if (err) {
            return reject(err);
            }

            resolve(tempName);
        }); 

    } )

    

}

module.exports = {
    uploadFile
}