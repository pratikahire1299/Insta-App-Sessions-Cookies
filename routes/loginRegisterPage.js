const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/loginRegisterPageController');
const auth = require('../middleware/authentication');

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/logout', auth, controllers.logout);

module.exports = router;
