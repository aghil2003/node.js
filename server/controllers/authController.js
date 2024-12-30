const Post = require('../models/Post');
const LoginUser = require('../models/Login-user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

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
    const { username, password } = req.body;
    const user = await LoginUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.redirect(`/dashboard/${user._id}`);
  } catch (error) {
    console.log(error);
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
      body: req.body.body,
      userId: userId
    });
    await Post.create(newPost);
    res.redirect(`/dashboard/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getEditPostPage = async (req, res) => {
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
      body: req.body.body,
      updatedAt: Date.now()
    });
    res.redirect(`/post-edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
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
      res.redirect('/dashboard');
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


