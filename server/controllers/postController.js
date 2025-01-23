const Post = require('../models/Post');
const LoginUser = require('../models/Login-user');
const EditLayout= '../views/layout/edit';

// Home page: Fetch all posts
exports.getAllPosts = async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb.",
  };

  try {
    const data = await Post.find({ isActive: true }).sort({ createdAt: -1 });;
    res.render('index', { locals,data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
};

// Single post page
exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findById({ _id: id, isActive: true });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render('post', {
      locals,
      data,
      currentRoute: `/post/${id}`,
      layout:EditLayout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching the post");
  }
};



// Search for posts
exports.searchPosts = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { isActive: 'true',},
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      data,
      locals,
      currentRoute: '/',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error performing search");
  }
};


exports.AboutUs= async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };
    res.render('about');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
};
