const User = require('../models/User')
module.exports = {
    // get users
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err)
        }
      },
      // get single user
      async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // create a new user
      async createUser(req, res) {
        try {
          const dbUserData = await User.create(req.body);
          res.json(dbUserData);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // update a user
      async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId, // user ID from URL parameter
                req.body, // update data
                { new: true } // return the updated document
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with this ID' });
            }
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.userId)
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with this ID' });
            }
    
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.body.friendId;
    
            // Prevent a user from adding themselves as a friend
            if (userId === friendId) {
                return res.status(400).json({ message: "Users cannot add themselves as a friend." });
            }
    
            // Find the user and update their friends list
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            // Check if the friend is already in the user's friends list
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: "This user is already your friend." });
            }
    
            // Add the friend's ID to the user's friends array
            user.friends.push(friendId);
            await user.save();
    
            res.status(200).json({ message: "Friend added successfully.", user });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try{
            // find User
            const user = await User.findById(req.params.userId)
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            // Check if the friend is already in the user's friends list
            if (!user.friends.includes(req.body.friendId)) {
                return res.status(400).json({ message: "This user is not your friend." });
            }
            const index = user.friends.indexOf(req.body.friendId);
            if (index > -1) {
                user.friends.splice(index, 1); // Removes the friend at the found index
            }
            await user.save();
            res.status(200).json({ message: "Friend removed successfully.", user });
        } catch (err) {
            res.status(500).json(err)
        }
    }
}