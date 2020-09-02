import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

const storageMulter = multer.diskStorage({
    destination:path.join(__dirname, '../../../public/uploads'),
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
  })
  var upload = multer({     
    storage: storageMulter,
    fileFilter: function (req, file, cb) {
         let ext = path.extname(file.originalname);
         if (ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg' && ext !== '.docx') {
              req.fileValidationError = "Forbidden extension";
              return cb(null, false, req.fileValidationError);
        }
        cb(null, true);
    }
});

module.exports = {
    pingWithoutAuth: () => {
        return {
            pong: "pong without Auth"
        }
    },
    pingWithAuth: async(args, req) =>{
        if(!req.isAuth) throw new Error('Unauthenticated!')
        return {
            pong: "pong with Auth"
        }
    },
    upFile:  async(args, req) => {
        console.log(args)
        if (req.fileValidationError) {
            req.flash('message', `Archivo no valido`)
            return res.end(req.fileValidationError);
        }
        return {
            pong: "true"
        }
    }
}