const path  = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:  path.resolve(path.join(__dirname, '../'), 'uploads'),
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + req.user._id + '-' + Date.now() + path.extname(file.originalname));
    }
})

module.exports = storage