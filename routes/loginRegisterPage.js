const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/loginRegisterPageController');


router.post('/login',controllers.login);
router.get('/logout',controllers.logout);

module.exports=router;