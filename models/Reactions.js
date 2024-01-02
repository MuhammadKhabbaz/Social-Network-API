const {Schema, model} = require('mongoose');

const reactionsSchema = new Schema(
    {
        reaction: {
            type: String,
            required: true
        },
        thought: {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        },
        user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        },
    },
    {
        timestamps: true
    }
);


const Reactions = model('Reactions', reactionsSchema);

module.exports = Reactions;