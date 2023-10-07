const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership } = require('../../db/models');

const router = express.Router();

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
        include: [
            { model: User, as: 'Members' },
            { model: User, as: "Creator" },
            { model: Room, as: 'Rooms' }
        ],
        where: { id: req.params.id },
 });
 return res.json(community);
})

router.post(
    '/',
    requireAuth,
    async (req, res) => {
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
