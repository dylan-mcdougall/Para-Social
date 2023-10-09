const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership } = require('../../db/models');

const router = express.Router();

module.exports = router;
