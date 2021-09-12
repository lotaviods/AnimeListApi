const express = require('express');
const anime = require('../model/anime');
const mongoose = require("../database");
const moment = require('moment-timezone');
const router = express.Router()

router.post('/anime', async(req, res) => {
    console.info("POST: ", req.socket.remoteAddress, "Make request at: ", moment.tz(Date.now(), process.env.TIME))
    try {
        const Anime = mongoose.model("anime");

        const newAnime = new Anime();

        newAnime.name = req.body.name

        newAnime.save().then(anime => {
            console.info("New anime saved:", anime),
                res.status(201).send({ "anime": anime.name })
        }, error => {
            console.info(error)
            res.status(500).send()
        })
    } catch (e) {
        res.status(500)
        res.send({ error: "Internal server error" })
        console.error(e)
    }
})
router.get('/anime', async(req, res) => {
    console.info("GET: ", req.socket.remoteAddress, "Make request at: ", moment.tz(Date.now(), process.env.TIME))
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
router.delete('/anime', async(req, res) => {
    console.info("DELETE: ", req.socket.remoteAddress, "Make request at: ", moment.tz(Date.now(), process.env.TIME))
    const Anime = mongoose.model("anime");

    try {
        let resposta = Anime.deleteOne({ "name": req.body.name })
        res.status(200)
        res.send(resposta)
        console.info("DELETE OK - ", resposta)

    } catch (e) {
        res.status(500)
        res.send({ error: "Internal server error" })
        console.error(e)
    }


})
module.exports = app => app.use("/api/", router)