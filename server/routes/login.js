
const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authController');

const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');


 router.get('/login', authcontroller.getLoginPage);
 
//  router.get('/signin', blogController.getSigninPage);
 router.get('/register', authcontroller.getRegisterPage);
// router.get('/dashboard', authMiddleware,blogController.getDashBoard);
router.post('/signin', authcontroller.postSignin);
router.get('/dashboard/:id', authMiddleware, blogController.getDashboard);
router.get('/post/:id', authMiddleware, blogController.getPostDashboard);
router.get('/new-post', authMiddleware, blogController.getNewPostPage);
router.post('/new-post', authMiddleware, blogController.postNewPost);
router.get('/post-edit/:id', authMiddleware, blogController.getEdituserPage);
router.put('/post-edit/:id', authMiddleware, blogController.putEditPost);
router.delete('/post-delete/:id', authMiddleware, blogController.Postdelete);
router.delete('/logout', blogController.logout);
router.post('/register', authcontroller.postRegister);




router.get('/admindashboard', authMiddleware,  blogController.getAdminDashboard);
router.get('/add-post', authMiddleware,  blogController.getAddPostPage);
router.post('/add-post', authMiddleware,  blogController.createPost);
router.get('/edit-post/:id', authMiddleware,  blogController.getEditPostPage);
router.put('/edit-post/:id', authMiddleware, blogController.updatePost);
router.delete('/delete-post/:id', authMiddleware,  blogController.deletePost);
// router.post('/register',  blogController.registerUser);
 router.get('/logout',  blogController.logout) 


//  // General Error Handler (500 Internal Server Error)
//  router.use(ErrorController.get500);
 


module.exports = router;


