const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const communitiesRouter = require('./communities.js');
const roomsRouter = require('./rooms.js');
const { restoreUser } = require('../../utils/auth.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/communities', communitiesRouter);
router.use('/rooms', roomsRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
