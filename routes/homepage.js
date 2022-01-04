const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/postcontroller');
const auth = require('../Middleware/authentication');

router.get('/', auth, controllers.get_all_posts_of_all_users);

module.exports = router;
