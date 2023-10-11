const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership, RoomMessage } = require('../../db/models');

const router = express.Router();

router.get('/:id', requireAuth, async (req, res) => {
    const room = await Room.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: RoomMessage, as: 'Messages' }
        ]
    });
    if (!room) return res.status(404).json({
        "errors": "No room associated with this id exists."
    });

    return res.json(room);
})

module.exports = router;
