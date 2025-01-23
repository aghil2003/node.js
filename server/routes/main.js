// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');


// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });


// router.get('/post/:id', async (req, res) => {
//   try {
//     let slug = req.params.id;

//     const data = await Post.findById({ _id: slug });

//     const locals = {
//       title: data.title,
//       description: "Simple Blog created with NodeJs, Express & MongoDb.",
//     }

//     res.render('post', { 
//       locals,
//       data,
//       currentRoute: `/post/${slug}`
//     });
//   } catch (error) {
//     console.log(error);
//   }

// });

// router.post('/search', async (req, res) => {
//   try {
//     const locals = {
//       title: "Seach",
//       description: "Simple Blog created with NodeJs, Express & MongoDb."
//     }

//     let searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

//     const data = await Post.find({
//       $or: [
//         { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
//         { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
//       ]
//     });

//     res.render("search", {
//       data,
//       locals,
//       currentRoute: '/'
//     });

//   } catch (error) {
//     console.log(error);
//   }
// })


// // function insertPostData(){
// //   Post.insertMany([
// //     {
// //       title:"this is first blog",
// //       body:"this is the body for first blog"
// //     },
// //     {
// //       title:"this is second blog",
// //       body:"this is the body for second blog"
// //     },
// //     {
// //       title:"this is third blog",
// //       body:"this is the body for third blog"
// //     },
// //   ])
// // }
// // insertPostData()



// module.exports = router;

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
