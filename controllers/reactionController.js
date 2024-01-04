const Reactions = require('../models/Reactions')

module.exports = {
    // get reactions
    async getReactions(req,res) {
        try{
            const reactions = await Reactions.find()
                .populate({ path: 'user', select: '-__v' })
                .populate({ path: 'thought', select: '-__v' });
            res.json(reactions);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // get single reaction
    async getSingleReaction(req,res) {
        try{
            const reaction = await Reactions.findById(req.params.reactionId)
                .populate({ path: 'user', select: '-__v' })
                .populate({ path: 'thought', select: '-__v' });
            if (!reaction) {
                return res.staus(404).json({message: 'No reaction with that ID'})
            }
            res.json(reaction)
        }catch(err) {
            res.status(500).json(err);
        }
    },
    // create reaction
    async createReaction(req,res) {
        try{
            const newReaction = await Reactions.create(req.body);
            res.json(newReaction);
        }catch(err) {
            res.status(500).json(err);
        }
    },
    // update reaction
    async updateReaction(req,res) {
        try{
            const updatedReaction = await Reactions.findByIdAndUpdate(
                req.params.reactionId,
                req.body,
                {new: true}
            );
            if (!updatedReaction) {
                res.status(404).json({message: 'No reaction with this ID'})
            };
            res.jsonn(updatedReaction);
        }catch(err) {
            res.status(500).json(err);
        }
    },
    // delete reaction
    async deleteReaction(req,res) {
        try{
            const deletedReaction = await Reactions.findByIdAndDelete(req.params.reactionId);
            if (!deletedReaction) {
                res.status(404).json({message: 'No reaction with this ID'})
            }
            res.json({message: 'Reaction successfully deleted'})
        } catch(err) {
            res.status(500).json(err)
        }
    }
}