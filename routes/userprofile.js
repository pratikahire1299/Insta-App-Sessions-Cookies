const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/usercontroller.js');


const auth = require("../Middleware/authentication.js"); 

router.get('/',auth,controllers.getuserdetails);
router.get("/:User_id",auth, controllers.get_user_data);  

module.exports=router;