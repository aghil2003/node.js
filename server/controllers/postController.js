const Post = require('../models/Post');

// Home page: Fetch all posts
exports.getAllPosts = async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb.",
  };

  try {
    const data = await Post.find();
    res.render('index', { locals, data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
};

// Single post page
exports.getPostById = async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render('post', {
      locals,
      data,
      currentRoute: `/post/${slug}`,
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
