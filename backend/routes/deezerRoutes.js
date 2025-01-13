const express = require('express');
const {getRecentMedia, getTracks, getAlbum, getEachSong, searchForMedia} = require("../controllers/deezerController");
const router = express.Router();

router.get('/getMedia', getRecentMedia)
router.get('/getTracks/:trackId',getTracks)
router.get('/getAlbum/:albumId', getAlbum)
router.get('/getSong/:songId', getEachSong)
router.get('/search/:query',searchForMedia)
module.exports = router;