// controllers/api/user-routes.js
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/login - User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/logout - User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/users/:id - Update a user's information
router.put('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
