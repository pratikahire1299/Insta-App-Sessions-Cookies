const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/usercontroller.js');

const auth = require("../Middleware/authentication.js"); 

router.get('/',auth,controllers.getuserdetails);

module.exports=router;