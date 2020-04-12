const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true
    },
    usersScoreSum: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Invalid score!')
            }
        }
    },
    usersScoreCount: {
        type: Number,
        default: 0
    }
})

movieSchema.methods.getAverageScore = function () {
    const movie = this
    const averageScore = movie.usersScoreSum / movie.usersScoreCount * 1.0

    return averageScore
}

movieSchema.methods.updateScore = function (oldScore, newScore) {
    const movie = this
    
    if(oldScore===null && newScore===null) return
    if(oldScore===null){
        movie.usersScoreCount = movie.usersScoreCount + 1
        movie.usersScoreSum = movie.usersScoreSum - oldScore + newScore
    }else if(newScore===null){
        movie.usersScoreCount = movie.usersScoreCount - 1
        movie.usersScoreSum = movie.usersScoreSum - oldScore
    }else {
        movie.usersScoreSum = movie.usersScoreSum - oldScore + newScore
    }
}

movieSchema.methods.addScore = function (scoreToAdd) {
    const movie = this
    if(scoreToAdd===null) return
    movie.usersScoreSum = movie.usersScoreSum + scoreToAdd
    movie.usersScoreCount = movie.usersScoreCount + 1
}

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie