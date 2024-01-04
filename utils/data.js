const User = require('../models/User');
const Thoughts = require('../models/Thoughts');
const Reactions = require('../models/Reactions');

// Export your existing data or create example data
module.exports = {
  users: [
    {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      password: 'password',
      friends: [],
    },
    {
        first_name: 'Max',
        last_name: 'King',
        username: 'maxk',
        password: 'password',
        friends: ['65967efcbc06c7dc8bf48307'],
      },
    
  ],
  thoughts: [
    {
      thought: 'This is a thought',
      user: '65967efcbc06c7dc8bf48307', // Reference to a user document's ObjectId
    },
  ],
  reactions: [
    {
      reaction: 'Like',
      thought: '65967efcbc06c7dc8bf4830c', // Reference to a thought document's ObjectId
      user: '65967efcbc06c7dc8bf48308', // Reference to a user document's ObjectId
    },

  ],
};

