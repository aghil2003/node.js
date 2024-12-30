const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const adminLayout = '../views/layout/admin';

// Admin - Login Page
exports.getLoginPage = (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };
  res.render('admin/index', { locals, layout: adminLayout });
};

// Admin - Check Login
exports.checkLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin Dashboard
exports.getDashboard = async (req, res) => {
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
      body: req.body.body,
      userId,
    });

    await Post.create(newPost);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
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
exports.editPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });
    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.error(error);
  }
};

// Admin - Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
  }
};

// Admin - Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User Created', user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Username already in use' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Admin - Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
