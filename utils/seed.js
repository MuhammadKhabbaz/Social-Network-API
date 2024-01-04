const mongoose = require('mongoose');
const data = require('./data'); // Import your data module
const User = require('../models/User'); // Import your Mongoose models
const Thoughts = require('../models/Thoughts');
const Reactions = require('../models/Reactions');

// Define a function to seed your database
async function seedDatabase() {
  try {
    // Connect to your MongoDB database
    await mongoose.connect('mongodb://localhost:27017/socialNetworkAPI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Seed users
    const users = await User.create(data.users);

    // Seed thoughts and reactions (update the references)
    const thoughts = data.thoughts.map((thought) => ({
      ...thought,
      user: users.find((user) => user.username === thought.user),
    }));

    const reactions = data.reactions.map((reaction) => ({
      ...reaction,
      thought: thoughts.find((thought) => thought.thought === reaction.thought),
      user: users.find((user) => user.username === reaction.user),
    }));

    await Thoughts.create(thoughts);
    await Reactions.create(reactions);

    console.log('Database seeded successfully.');

    // Close the database connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

// Call the seed function to populate the database
seedDatabase();
