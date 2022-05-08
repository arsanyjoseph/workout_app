const path = require('path')

const checkFileType = (file, cb)=> {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb({message: "Only Images Are Allowed"})
    }
}

module.exports = checkFileType