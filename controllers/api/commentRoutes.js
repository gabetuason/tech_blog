const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route for add a new comment to a post
router.post("/", withAuth, async (req, res) => {
  try {
    const createdComment = await Comment.create({
      contents: req.body.contents,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(createdComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an existing comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
