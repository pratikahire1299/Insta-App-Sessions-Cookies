const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/usercontroller');

const auth = require('../Middleware/authentication');

router.get('/', auth, controllers.getuserdetails);
router.get('/:User_id', auth, controllers.get_user_data);

module.exports = router;
