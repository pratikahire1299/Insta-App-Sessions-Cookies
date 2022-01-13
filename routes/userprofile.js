const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/usercontroller');

const auth = require('../middleware/authentication');

router.get('/', auth, controllers.getUserdetails);
router.get('/:user_id', auth, controllers.getUserdetailsById);

module.exports = router;
