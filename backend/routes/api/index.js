const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

// GET /api/restore-user
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
