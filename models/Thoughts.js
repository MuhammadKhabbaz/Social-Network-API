const {Schema, model} = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thought: {
            type: String,
            required: true
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


const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;