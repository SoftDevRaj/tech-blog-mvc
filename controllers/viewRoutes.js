// controllers/viewRoutes.js
const router = require('express').Router();
const { Post } = require('../models'); // Example model import, replace with your actual models
const withAuth = require('../utils/auth');

// Home route to display all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          // Include your user model here for author info:
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the home page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the login page
  res.render('login');
});

module.exports = router;
