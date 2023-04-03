// imports the required dependencies and sets up the router object for the application.
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to dashboard, where users can see their own posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "contents", "date_posted"],
      order: [["date_posted", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("dashboard", { posts, loggedIn: true }); // Render dashboard page and pass the posts and loggedIn variables to the template
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to create new post
router.get("/post/create", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "contents", "date_posted"],
    });

    const post = postData.map((post) => trip.get({ plain: true }));

    res.render("create-post", { post, loggedIn: true }); // Render create-post page and pass the post and loggedIn variables to the template
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to individual posts
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });

    res.render("post", { post }); // Render post page and pass the post variable to the template
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
