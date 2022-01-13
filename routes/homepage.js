const Express = require('express');

const router = Express.Router();
const controllers = require('../controllers/postcontroller');
const auth = require('../middleware/authentication');

router.get('/', auth, controllers.getAllPostOfAllUsers);
router.post('/:post_id', auth, controllers.postlike);
router.post('/:post_id/:user_id', auth, controllers.postcomment);

module.exports = router;
