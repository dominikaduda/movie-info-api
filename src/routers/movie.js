const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const MovieInteraction = require('../models/movieInteraction')
const Movie = require('../models/movie')
const omdbAPI = require('../utils/omdbAPI')

router.get('/movies', auth, async (req, res) => {
    if (!req.query.title){
        return res.status(404).send({
            error: 'You must provide the title'
        })
    }

    omdbAPI(req.query.title, async (error, omdbData) => { 
        if (error) {
            if (error==='Unable to find movie. Try again with different search term'){
                return res.status(404).send({ error})
            }else{
                return res.status(500).send({ error})
            }
        }

        let averageScore = null
        let userScore = null
        let isFavourite = false;

       try{
            const movie = await Movie.findOne({ imdbID: omdbData.imdbID })
            const movieInteraction = await MovieInteraction.findOne({ imdbID: omdbData.imdbID,  owner: req.user._id})

            if (movie) {
                averageScore = movie.getAverageScore()
            }
            if (movieInteraction) {
                userScore = movieInteraction.userScore
                isFavourite = movieInteraction.favourite
            }

            res.send( { omdbData, averageScore, userScore, isFavourite } )            
        } catch (e) {
            res.status(500).send(e)
        }
    })
})



module.exports = router
