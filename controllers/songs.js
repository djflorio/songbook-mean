const express = require('express');
const router = express.Router();
const song = require('../models/song');

router.get('/', (req, res) => {
    song.getAllSongs((err, songs) => {
        if (err) {
            res.json({success: false, message: `Failed to load all songs. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, songs: songs},null,2));
            res.end();
        }
    });
});

router.get('/:id', (req, res) => {
    song.findOne({ '_id': req.params.id }, (err, song) => {
        if (err) {
            res.json({success: false, message: `Failed to load song by ID. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, song: song},null,2));
            res.end();
        }
    });
});

router.get('/user/:id', (req, res) => {
    song.getSongsByUserId(req.params.id, (err, songs) => {
        if (err) {
            res.json({success: false, message: `Failed to load songs by user ID. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, songs: songs},null,2));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newSong = new song({
        title: req.body.title,
        artist: req.body.artist,
        keywords: req.body.keywords,
        user: req.body.user,
        sections: req.body.sections
    });
    song.createSong(newSong, (err, song) => {
        if (err) {
            res.json({success: false, message: `Failed to create a new song. Error: ${err}`});
        } else {
            res.json({success: true, message: "Added successfully."});
        }
    });
});

module.exports = router;