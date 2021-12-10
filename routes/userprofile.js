const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/usercontroller.js');



router.get('/',controllers.getuserdetails);

module.exports=router;