const Post = require('../models/Post');
const LoginUser = require('../models/Login-user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const adminLayout = '../views/layout/admin';

exports.getLoginPage = async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    res.render('signup/index', { locals });
  } catch (error) {
    console.log(error);
  }
};

exports.getSigninPage = async (req, res) => {
  try {
    const locals = {
      title: "Signin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    res.render('signup/signup', { locals, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};

exports.getRegisterPage = async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    res.render('signup/login', { locals, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};


exports.postSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await LoginUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    // console.log(`User Role: ${user.role}`); // Debugging log for role

    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });

    if (user.role === 'Admin') {
      return res.redirect(`/admindashboard`);
    } else if (user.role === 'User') {
      return res.redirect(`dashboard/:id`);
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.getDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };

    const userId = req.userId;
    const data = await Post.find({ userId });
    res.render('signup/dashboard', { locals, data, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};

exports.getDashBoard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };

    const userId = req.userId;
    const data = await Post.find({ userId });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
};

exports.getNewPostPage = async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };
    res.render('signup/add-post', { locals, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};

exports.postNewPost = async (req, res) => {
  try {
    const userId = req.userId;
    const newPost = new Post({
      title: req.body.title,
      body: req.body.Body,
      userId
    });
    await newPost.save(); 
    res.redirect(`/dashboard/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getEdituserPage = async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Free NodeJs User Management System.'
    };
    const data = await Post.findOne({ _id: req.params.id });
    res.render('signup/post-edit', { locals, data, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};

exports.putEditPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.Body,
      updatedAt: Date.now()
    });
    res.redirect(`/post-edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.Postdelete = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect(`/dashboard/${req.userId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

exports.postRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await LoginUser.create({ username, email, password: hashedPassword });
      res.redirect('/signin');
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'User already in use' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  } catch (error) {
    console.log(error);
  }
};



// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    const data = await Post.find();
    res.render('admin/dashboard', { locals, data, layout: adminLayout });
  } catch (error) {
    console.error(error);
  }
};

// Admin - Add Post Page
exports.getAddPostPage = (req, res) => {
  const locals = {
    title: 'Add Post',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };
  res.render('admin/add-post', { locals, layout: adminLayout });
};

// Admin - Create New Post
exports.createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const newPost = new Post({
      title: req.body.title,
      body: req.body.Body,
      userId
    });
    await newPost.save(); 
    res.redirect('/admindashboard');
  } catch (error) {
    console.log(error);
  }
};

// Admin - Edit Post Page
exports.getEditPostPage = async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Edit Post Details',
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render('admin/edit-post', { locals, data, layout: adminLayout });
  } catch (error) {
    console.error(error);
  }
};


// Admin - Update Post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Update the post in the database
    await Post.findByIdAndUpdate(postId, { 
      title: req.body.title,
      body: req.body.Body, });

    // Redirect to the dashboard after updating
    res.redirect('/admindashboard');
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Admin - Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/admindashboard');
  } catch (error) {
    console.error(error);
  }
};

// // Admin - Register User
// exports.registerUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ username, password: hashedPassword });
//     res.status(201).json({ message: 'User Created', user });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(409).json({ message: 'Username already in use' });
//     } else {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// };

// Admin - Logout
// exports.logout = (req, res) => {
//   res.clearCookie('token');
//   res.redirect('/');
// };
//

