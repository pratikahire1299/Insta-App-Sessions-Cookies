const multer = require('multer');

const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/postcontroller');
const auth = require('../middleware/authentication');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueSuffix + file.ornpmiginalname);
  },
});

const upload = multer({ storage });

router.get('/:user_id', auth, controllers.getUserPost); // Get posts of User Accept:user: _id
router.post('/:user_id', auth, upload.single('imageOfPost'), controllers.createUserPost); // ADD Post of User Accept:user: _id
router.delete('/:post_id', auth, controllers.deleteUserPost); // delete  post of User required Accept: post: _id
router.patch('/:post_id', auth, upload.single('imageOfPost'), controllers.updateUserPost); // Update any post  Accept: Post: _id
router.delete('/:user_id/all', auth, controllers.deleteAllUserPost); // delete  post of User required Accept: user: _id

module.exports = router;
