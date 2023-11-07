// controllers/index.js
const router = require('express').Router();

// Import our modular routers for /api and /views
const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');

router.use('/api', apiRoutes);
router.use('/', viewRoutes);

// If we request any route not available, we'll get a 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
