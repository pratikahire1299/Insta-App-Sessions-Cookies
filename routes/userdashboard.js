

var multer=require('multer');

const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller');
const auth = require("../Middleware/authentication.js"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix +file.ornpmiginalname)
  }
})

var upload=multer({storage:storage});




router.get("/:User_id",auth, controllers.get_user_posts);   // Get posts of User Accept:user: _id

router.post("/:User_id", auth, upload.single('ImageOfPost'), controllers.create_user_post); //ADD Post of User Accept:user: _id
router.delete("/:Post_id", auth, controllers.delete_user_post); // delete  post of User required Accept: post: _id
router.patch("/:Post_id",auth, upload.single('ImageOfPost'),controllers.Update_User_post); //Update any post  Accept: Post: _id  

router.delete("/:User_id/all", auth, controllers.delete_all_user_post);  // delete  post of User required Accept: user: _id

module.exports = router;