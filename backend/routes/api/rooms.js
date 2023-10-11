const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership, RoomMessage } = require('../../db/models');

const router = express.Router();

// router.get('/:id', requireAuth, async (req, res) => {

// })

module.exports = router;
