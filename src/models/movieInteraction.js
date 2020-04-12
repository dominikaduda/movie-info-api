const mongoose = require('mongoose')

const movieInteractionSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true
    },
    userScore: {
        type: Number,
        default: null,
        validate(value) {
            if (value !== null && (value > 10 || value < 1)) {
                throw new Error('Score must be a number from 1 to 10 or null! If score equals null it counts as if movie was never scored by authorized user.')
            }
        }
    },
    favourite: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const MovieInteraction = mongoose.model('MovieInteraction', movieInteractionSchema)

module.exports = MovieInteraction