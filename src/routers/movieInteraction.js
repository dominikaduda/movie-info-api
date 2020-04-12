const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const MovieInteraction = require('../models/movieInteraction')
const Movie = require('../models/movie')

router.post('/movies/:imdbID/interactions', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['userScore', 'favourite']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
       let movie = await Movie.findOne({ imdbID: req.params.imdbID })
       let movieInteraction = await MovieInteraction.findOne({ imdbID: req.params.imdbID, owner: req.user._id })
       let ifScoredBefore = true
       
       if(!movieInteraction){
            ifScoredBefore = false
            try {
                movieInteraction = new MovieInteraction({
                    ...req.body,
                    owner: req.user._id,
                    imdbID: req.params.imdbID
                })
            } catch (e) {
                res.status(422).send(e)
            }
        }

       if(!movie){
            try {
                movie= new Movie({
                ...req.body,
                imdbID: req.params.imdbID
            })
            } catch (e) {
                res.status(422).send(e)
            }     
            
            await movie.save()
        }

        let prevScore = movieInteraction.userScore
        updates.forEach((update) => movieInteraction[update] = req.body[update])
        await movieInteraction.save()

        if ('userScore' in req.body) {
            if(ifScoredBefore) {
                movie.updateScore(prevScore, movieInteraction.userScore)
            }else {
                movie.addScore(movieInteraction.userScore)
            }
            await movie.save()
        }

        res.send( { movie, movieInteraction } )
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router