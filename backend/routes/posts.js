const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate');

router.get('/', postController.getPosts);
router.post('/write', authenticate, postController.writePost);

module.exports = router;
