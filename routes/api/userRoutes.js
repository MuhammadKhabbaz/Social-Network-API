const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    getUserThoughts,
    getUserReactions
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:userId/addFriend').put(addFriend);

router.route('/:userId/removeFriend').put(removeFriend);

router.route('/:userId/thoughts').get(getUserThoughts);

router.route('/:userId/reactions').get(getUserReactions);

module.exports = router;