const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership } = require('../../db/models');

const router = express.Router();

router.patch('/:id/members/:userId/approve', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (req.user.id !== community.creator_id) return res.status(401).json({
        "errors": "Forbidden"
    });
    const targetMembership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (!targetMembership) return res.status(400).json({
        "errors": "User has not requested to join this community."
    });
    if (targetMembership.status !== 'pending') return res.status(400).json({
        "errors": "User is already a member of this community."
    });

    await targetMembership.update({ status: 'member' }, {
        where: {
            status: 'pending'
        }
    });

    return res.json(targetMembership);
})

router.delete('/:id/members/:userId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (req.user.id !== parseInt(req.params.userId) && req.user.id !== community.creator_id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    if (parseInt(req.params.userId) === community.creator_id) return res.status(400).json({
        "errors": "Cannot currently delete membership of community creator."
    })
    const membership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (!membership) return res.status(400).json({
        "errors": "User is not currently a member of this group."
    });

    await membership.destroy();
    return res.json({
        "message": "Membership successfully deleted."
    });
})

router.post('/:id/members/:userId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    const membership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (membership) return res.status(400).json({
        "errors": "User is already a member or has requested to join this group."
    });

    const payload = await Membership.create({
        user_id: req.params.userId, community_id: req.params.id, status: 'pending'
    });
    if (payload) {
        return res.json(payload)
    } else return res.status(500).json({
        "errors": "Could not create membership for this user."
    })
})

router.post('/:id/rooms/new', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden"
        });
    }
    const { name } = req.body;
    if (!name) return res.status(400).json({
        "errors": "Please include a valid room name in the request body"
    });

    const payload = await Room.create({ community_id: req.params.id, name });
    return res.json(payload);
})

router.delete('/:id/rooms/:roomId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    const targetRoom = await Room.findByPk(req.params.roomId);
    if (!targetRoom) return res.status(404).json({
        "errors": "Room associated with this id does not exist."
    })
    if (targetRoom.community_id !== parseInt(req.params.id)) {
        return res.status(400).json({
            "errors": "Room associated with this id does not belong to the specified community."
        })
    }

    await targetRoom.destroy();
    return res.json({
        "message": "Room successfully deleted."
    })
})

router.patch('/:id/rooms/:roomId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    const targetRoom = await Room.findByPk(req.params.roomId);
    if (!targetRoom) return res.status(404).json({
        "errors": "Room associated with this id does not exist."
    })
    if (targetRoom.community_id !== parseInt(req.params.id)) {
        return res.status(400).json({
            "errors": "Room associated with this id does not belong to the specified community."
        })
    }
    const { name } = req.body;
    if (!name) return res.status(400).json({
        "errors": "Please include a valid room name in the request body."
    });

    await targetRoom.update({ name: name });
    return res.json(targetRoom);
})

router.get('/:id/rooms', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });

    const targetRooms = await Room.findAll({
        where: {
            community_id: req.params.id
        }
    });

    if (!targetRooms) return res.status(404).json({
        "errors": "Designated Community currently has no rooms."
    })

    return res.json(targetRooms);
})

router.delete('/:id', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden"
        });
    }

    await community.destroy();
    return res.json({
        "message": "Community successfully deleted."
    })
})

router.get('/:id', requireAuth, async (req, res) => {
    const community = await Community.findOne({
        where: { id: req.params.id },
        include: [
            { model: User, as: 'Members' },
            { model: User, as: "Creator" },
            { model: Room, as: 'Rooms' }
        ],
    });
    return res.json(community);
})

router.post('/', requireAuth, async (req, res) => {
        const { name, description, private, price } = req.body;
        const creator_id = req.user.id;
        const community = await Community.create({ creator_id, name, description, private, price });

        return res.json(community);
    }
);

router.get('/', async (req, res) => {
    const communityList = await Community.findAll()
    return res.json({
        communityList
    })
}
);

module.exports = router;