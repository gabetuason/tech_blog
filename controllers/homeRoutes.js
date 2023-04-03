// imports the required dependencies and sets up the router object for the application.
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");


// Route for displaying the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Route for displaying the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// Route for displaying the home page with all posts and their comments
router.get("/", async (req, res) => {
  try {
// Find all posts, including their associated comments and users
    const postData = await Post.findAll({
      attributes: ["id", "title", "contents", "date_posted", "user_id"],
      include: [
        {
          model: Comment,
          include: { model: User, attributes: ["username"] },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["date_posted", "DESC"]],
    });

// Convert the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

// Render the home page template with the post data and logged in status
    res.render("home", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a blog post
router.get("/post/:id", async (req, res) => {
  try {
// Find a single post by its primary key, including its associated user and comments
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "contents", "date_posted", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
          },
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render("post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get post to edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "contents", "date_posted"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "Unable to look for post" });
    }

    const post = postData.get({ plain: true });
    res.render("update_post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the comment from id
router.get("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: ["id", "contents", "date_posted", "post_id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!commentData) {
      res.status(404).json({ message: "Unable to look for comment" });
    }
    const comment = commentData.get({ plain: true });
    res.render("comments", {
      comment,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for updating comment
router.get("/edit-comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: ["id", "contents", "date_posted", "post_id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!commentData) {
      res.status(404).json({ message: "Unable to look for comment" });
    }
    const comment = commentData.get({ plain: true });
    res.render("update_comment", {
      comment,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
