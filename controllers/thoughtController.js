const Thoughts = require('../models/Thoughts')

module.exports = {
    // get thoughts
    async getThoughts(req,res) {
        try{
            const thoughts = await Thoughts.find().populate({path: 'user', select: '-__v'});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get single thought
    async getSingleThought(req,res) {
        try{
            const thought = await Thoughts.findOne({_id: req.params.thoughtId}).populate({path: 'user', select: '-__v'});
            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create thought
    async createThought(req,res) {
        try{
            const newThought = await Thoughts.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req,res) {
        try{
            const updatedThought = await Thoughts.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                {new: true}
            );

            if (!updatedThought) {
                return res.status(404).json({message: 'No though with this ID'})
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req,res) {
        try{
            const deletedThought = await Thoughts.findByIdAndDelete(req.params.thoughtId)
            if (!deletedThought) {
                return res.status(404).json({message: 'No thought with this ID'})
            }
            res.json({message: 'Thought successfully deleted'})
        } catch(err) {
            res.status(500).json(err)
        }
    }
}