const router = require('express').Router();
const {
    getReactions,
    getSingleReaction,
    createReaction,
    updateReaction,
    deleteReaction,
} = require('../../controllers/reactionController')

router.route('/').get(getReactions).post(createReaction);

router.route('/:reactionID').get(getSingleReaction).put(updateReaction).delete(deleteReaction);

module.exports = router;