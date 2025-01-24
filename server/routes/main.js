
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Route to fetch all posts
router.get('/', postController.getAllPosts);

// Route to fetch a single post by ID
router.get('/post/:id', postController.getPostById);

// Route to search for posts
router.post('/search', postController.searchPosts);

router.get('/about',postController.AboutUs)



module.exports = router;
