const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/loginRegisterPageController');
const auth = require('../Middleware/authentication');

router.post('/Register', controllers.register);
router.post('/login', controllers.login);
router.get('/logout', auth, controllers.logout);

module.exports = router;
