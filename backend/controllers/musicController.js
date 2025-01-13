const User = require('../models/userModel');
const Music = require('../models/musicModel');
const addToFavourites = async (req, res) => {
    const userId = req.user._id;
    const {mediaId,mediaType} = req.params;
    try {
        const user = await User.findById(userId);

        const music = await Music.create({
            userId,
            mediaId
        })

        if (mediaType === 'album') {
            user.media.albums.push(music._id);
        } else if (mediaType === 'song') {
            user.media.songs.push(music._id);
        } else {
            return res.status(400).json({ error: 'Invalid media type' });
        }

        await user.save();

        const populatedUser = await User.findById(userId)
            .populate('media.albums')
            .populate('media.songs');

        console.log(populatedUser, 'merUser')

        return res.status(200).json(populatedUser)

    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}


const removeFromFavourites = async (req, res) => {
    const userId = req.user._id;
    const {mediaId,mediaType} = req.params;
    try {
        const user = await User.findById(userId);

        const music = await Music.findOne({userId,mediaId})
        console.log(music,'music')
        console.log(user,'user')
        if (mediaType === 'album') {
           user.media.albums =  user.media.albums.filter((album) => album.toString() !== music._id.toString() );
        } else if (mediaType === 'song') {
            user.media.songs = user.media.songs.filter((song) => song.toString() !== music._id.toString() );
        } else {
            return res.status(400).json({ error: 'Invalid media type' });
        }
        await  user.save()

        const populatedUser = await User.findById(userId)
            .populate('media.albums')
            .populate('media.songs');

        await Music.findByIdAndDelete(music._id)
        return res.status(200).json(populatedUser)
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}


module.exports ={addToFavourites ,removeFromFavourites}