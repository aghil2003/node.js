// const express = require('express');
// const router = express.Router();
// const SignupLayout='../views/layout/signup'
// const Post = require('../models/Post');
// const LoginUser=require('../models/Login-user');
// const bcrypt= require('bcrypt');
// const jwt =require('jsonwebtoken');

// const jwtSecret=process.env.JWT_SECRET;

// /*check Login*/
// const authMiddleware = (req, res, next ) => {
//   const token = req.cookies.token;

//   if(!token) {
//     return res.status(401).json( { message: 'Unauthorized'} );
//   }

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.userId = decoded.userId;
//     next();
//   } catch(error) {
//     res.status(401).json( { message: 'Unauthorized'} );
//   }
// }


// router.get('/login', async (req, res) => {
//     try {
//       const locals = {
//         title: "login",
//         description: "Simple Blog created with NodeJs, Express & MongoDb."
//       }
  
//       res.render('signup/index', { locals });
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   router.get('/signin', async (req, res) => {
//     try {
//       const locals = {
//         title: "login",
//         description: "Simple Blog created with NodeJs, Express & MongoDb."
//       }
  
//       res.render('signup/signup', { locals, layout: SignupLayout });
//     } catch (error) {
//       console.log(error);
//     }
//   });


//   router.get('/register', async (req, res) => {
//     try {
//       const locals = {
//         title: "login",
//         description: "Simple Blog created with NodeJs, Express & MongoDb."
//       }
  
//        res.render('signup/login', { locals, layout: SignupLayout });
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   /**
//  * GET /
//  * Admin Dashboard
// */
// router.get('/dashboard', authMiddleware, async (req, res) => {
//   try {
//     const locals = {
//       title: 'Dashboard',
//       description: 'Simple Blog created with NodeJs, Express & MongoDb.'
//     }

//     res.redirect('/login');


//   } catch (error) {
//     console.log(error);
//   }

// });
  



//   /**
//  * POST /
//  * user - Check Login
// */
// router.post('/signin', async (req, res) => {
//   try {
//    const{ username,password }=req.body;
//    const user=await LoginUser.findOne({username});
//    if(!user){
//     return res.status(401).json({message:'wrong user name or password'});
//    }

//    const ispasswordvalid =await bcrypt.compare(password,user.password);
//    if(!ispasswordvalid){
//     return res.status(401).json({message:'wrong user name or password'});
//    }
   
//   const token = jwt.sign({ userId: user._id}, jwtSecret );
//       res.cookie('token', token, { httpOnly: true });
//       res.redirect('/dashBoard/_id');
      
   

//   } catch (error) {
//     console.log(error);
//   }
// });

// /**
//  * get /
//  * user - dashbord
// */
// router.get('/dashBoard/_id',authMiddleware, async (req, res) => {
//  try {
//      const locals = {
//        title: 'Dashboard',
//        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
//      }
     
//      const userId = req.userId; // Assuming authMiddleware sets req.user
//      const data = await Post.find({ userId });
//      res.render('signup/dashboard', {
//        locals,
//        data,
//        layout: SignupLayout
//      });
 
//    } catch (error) {
//      console.log(error);
//    }
// });  


// /**
//  * GET /
//  * user - Create New Post
// */
// router.get('/new-post', authMiddleware, async (req, res) => {
//   try {
//     const locals = {
//       title: 'Add Post',
//       description: 'Simple Blog created with NodeJs, Express & MongoDb.'
//     }

//     const userId = req.userId; // Assuming authMiddleware sets req.user
//      const data = await Post.find({ userId });
//     res.render('signup/add-post', {
//       locals,
//       layout: SignupLayout
//     });

//   } catch (error) {
//     console.log(error);
//   }

// });

// /**
//  * POST /
//  * user - Create New Post
// */
// router.post('/new-post', authMiddleware, async (req, res) => {
//   try {
//     try {
//       const userId = req.userId;
//       const newPost = new Post({
//         title: req.body.title,
//         body: req.body.Body,
//         userId: userId
//       });

//       await Post.create(newPost);
//       res.redirect('dashBoard/_id');
//     } catch (error) {
//       console.log(error);
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });


// /**
//  * GET /
//  * user - Create New Post
// */
// router.get('/post-edit/:id', authMiddleware, async (req, res) => {
//   try {

//     const locals = {
//       title: "Edit Post",
//       description: "Free NodeJs User Management System",
//     };

//     const data = await Post.findOne({ _id: req.params.id });

//     res.render('signup/post-edit', {
//       locals,
//       data,
//       layout: SignupLayout
//     })

//   } catch (error) {
//     console.log(error);
//   }

// });


// /**
//  * PUT /
//  * Admin - Create New Post
// */
// router.put('/post-edit/:id', authMiddleware, async (req, res) => {
//   try {

//     await Post.findByIdAndUpdate(req.params.id, {
//       title: req.body.title,
//       body: req.body.Body,
//       updatedAt: Date.now()
//     });

//     res.redirect(`/post-edit/${req.params.id}`);

//   } catch (error) {
//     console.log(error);
//   }

// });

// /**
//  * DELETE /
//  * Admin - Delete Post
// */
// router.delete('/post-delete/:id', authMiddleware, async (req, res) => {

//   try {
//     await Post.deleteOne( { _id: req.params.id } );
//     res.redirect('/dashBoard/_id');
//   } catch (error) {
//     console.log(error);
//   }
// });



// /**
//  * GET /
//  * Admin Logout
// */
// router.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   //res.json({ message: 'Logout successful.'});
//   res.redirect('/');
// });




// /* POST /
// * user - register
// */
// router.post('/register', async (req, res) => {
//  try {
//   const{ username,password,email }=req.body;
//   const hashedpassword = await bcrypt.hash(password, 10);

//   try {
//     const loginuser =await LoginUser.create({username,email,password:hashedpassword});
//     res.redirect('/dashBoard');
//   } catch (error) {
//    if(error.code === 11000){
//     res.status(409).json({message:'user already in use'});
//    } 
//    res.status(500).json({message:'internal server error'})
//   }

//  } catch (error) {
//    console.log(error);
//  }
// });




 


// module.exports=router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

 router.get('/login', authController.getLoginPage);
 router.get('/signin', authController.getSigninPage);
 router.get('/register', authController.getRegisterPage);
// router.get('/dashboard', authMiddleware,authController.getDashBoard);
router.post('/signin', authController.postSignin);
router.get('/dashboard/:id', authMiddleware, authController.getDashboard);
router.get('/new-post', authMiddleware, authController.getNewPostPage);
router.post('/new-post', authMiddleware, authController.postNewPost);
router.get('/post-edit/:id', authMiddleware, authController.getEdituserPage);
router.put('/post-edit/:id', authMiddleware, authController.putEditPost);
router.delete('/post-delete/:id', authMiddleware, authController.Postdelete);
router.get('/logout', authController.logout);
router.post('/register', authController.postRegister);




router.get('/admindashboard', authMiddleware,  authController.getAdminDashboard);
router.get('/add-post', authMiddleware,  authController.getAddPostPage);
router.post('/add-post', authMiddleware,  authController.createPost);
router.get('/edit-post/:id', authMiddleware,  authController.getEditPostPage);
router.put('/edit-post/:id', authMiddleware,  authController.updatePost);
router.delete('/delete-post/:id', authMiddleware,  authController.deletePost);
// router.post('/register',  authController.registerUser);
// router.get('/logout',  authController.logout) 

module.exports = router;


