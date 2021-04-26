const express = require('express');
const anime = require('../model/anime');
const mongoose = require("../database");
const {now} = require("mongoose");
const router = express.Router()
router.post('/anime', async (req, res) => {
    try {
        const Anime = mongoose.model("anime");

        const anime = new Anime();

        let newAnime = animeConstructor({
            anime: anime,
            description: anime.description,
            name: req.body.name
        })

        newAnime.save().then(anime => {
            console.info("New anime saved:", anime),
                res.status(201).send({"anime": anime.name})
        }, error => {
            console.info("Error")
            res.status(500).send()
        })
    } catch (e) {
        res.status(500)
        res.send({error: "Internal server error"})
        console.error(e)
    }
})
router.get('/anime', async (req, res) => {
    console.info("GET: ", req.socket.remoteAddress, "Make request at: ", now())
    const Anime = mongoose.model("anime");
    let animeList = [];
    Anime.find({}, (err, animes) => {
        animes.forEach(anime => {
            animeList.push(anime)
        })
        res.status(200).send({
            "AnimeList": animeList
        })
    })
})

module.exports = app => app.use("/api/", router)