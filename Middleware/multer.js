const multer = require('multer');

// set storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    // image.jpg
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

module.exports = store = multer({ storage });
