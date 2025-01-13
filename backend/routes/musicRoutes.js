const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute')
const {addToFavourites, removeFromFavourites} = require("../controllers/musicController");

router.post('/addToFavourites/:mediaId/:mediaType',protectRoute,addToFavourites);
router.post('/removeFromFavourites/:mediaId/:mediaType',protectRoute,removeFromFavourites);

module.exports = router;