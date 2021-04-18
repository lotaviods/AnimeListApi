const express = require('express');
const anime = require('../model/anime');
const mongoose = require("../database");
const router = express.Router()
router.post('/anime', async (req, res) => {
    try {
        const Anime = mongoose.model("anime");

        const anime = new Anime();

        anime.description = req.body.description;
        anime.number = req.body.number;
        anime.name = req.body.name;

        anime.save()
            .then(anime => {
                    console.info("POST: ", req.headers['user-agent'], req.headers.host, "Make new anime:", anime)
                    res.status(201)
                        .send({
                            "anime:": anime.name,
                            "number": anime.number,
                            "description": anime.description
                        })
                }, error => {
                    console.error(error)
                    res.status(400).send({"error": error})
                }
            )
    } catch (e) {
        res.status(500)
        res.send({error: "Internal server error"})
        console.error(e)
    }
})
router.get('/anime', async (req, res) => {
    console.info("GET: ", req.headers['user-agent'], req.headers.host, "Make request")
    const Anime = mongoose.model("anime");
    let animeList = {};
    Anime.find({}, (err, animes) => {
        animes.forEach(anime => {
            animeList[anime.number] = anime
        })
        res.status(200).send({"AnimeList: ": animeList})
    })
})

module.exports = app => app.use("/api/", router)