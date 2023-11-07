// controllers/dashboard-routes.js
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts by a user
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post by id to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        ...post,
        loggedIn: true
      });
    } else {
      res.status(404).json({ message: 'No post found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Only update post if it belongs to the logged in user
      },
    });

    if (postData > 0) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: 'No post found with this id or you do not have permission to edit it' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Only delete post if it belongs to the logged in user
      },
    });

    if (postData > 0) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: 'No post found with this id or you do not have permission to delete it' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
