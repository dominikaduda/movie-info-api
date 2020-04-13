const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const MovieInteraction = require('../../src/models/movieInteraction')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const movieInteractionOne = {
    _id: new mongoose.Types.ObjectId(),
    imdbID: 'tt0121387',
    userScore: 8,
    favourite: false,
    owner: userOne._id
}

const movieInteractionTwo = {
    _id: new mongoose.Types.ObjectId(),
    imdbID: 'tt0121387',
    userScore: 10,
    favourite: true,
    owner: userOne._id
}

const movieInteractionThree = {
    _id: new mongoose.Types.ObjectId(),
    imdbID: 'tt0121387',
    userScore: 9,
    favourite: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await MovieInteraction.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new MovieInteraction(movieInteractionOne).save()
    await new MovieInteraction(movieInteractionTwo).save()
    await new MovieInteraction(movieInteractionThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    movieInteractionOne,
    movieInteractionTwo,
    movieInteractionThree,
    setupDatabase
}