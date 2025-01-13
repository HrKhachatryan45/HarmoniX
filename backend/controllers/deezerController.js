const getRecentMedia = async (req, res) => {
    try {
        const response = await fetch(`https://api.deezer.com/chart`);
        const json = await response.json();

        // Check if there are at least 3 albums
        let albums = json.albums.data;

        if (albums.length >= 3) {
            // Return the top 3 albums
            res.status(200).json(albums.slice(0, 3));
        } else {
            // Fetch default albums if there are fewer than 3
            const defaultAlbumIds = [286816592, 177271872, 7838977]; // Replace with actual album IDs
            const defaultAlbumsPromises = defaultAlbumIds.map(id => fetch(`https://api.deezer.com/album/${id}`));

            // Wait for all default album responses
            const defaultAlbumsResponses = await Promise.all(defaultAlbumsPromises);
            const defaultAlbums = await Promise.all(defaultAlbumsResponses.map(res => res.json()));

            // Combine fetched albums with defaults, ensuring only 3 total
            const combinedAlbums = [...defaultAlbums];
            res.status(200).json(combinedAlbums);
        }
    } catch (error) {
        console.log(error, 'error');
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getTracks = async (req, res) => {
    try {
        const {trackId} = req.params;
        const response = await fetch(`https://api.deezer.com/album/${trackId}/tracks`);
        const json = await response.json()
        res.status(200).json(json)
    }catch (error) {
        console.log(error,'error')
    }
}

const getAlbum = async (req, res) => {
    try {
        const {albumId} = req.params;
        const response = await fetch(`https://api.deezer.com/album/${albumId}`);
        const json = await response.json()
        res.status(200).json(json)
    }catch (error) {
        console.log(error,'error')
    }
}
const getEachSong = async (req, res) => {
    try {
        const {songId} = req.params;
        const response = await fetch(`https://api.deezer.com/track/${songId}`);
        const json = await response.json()
        res.status(200).json(json)
    }catch (error) {
        console.log(error,'error')
    }
}

const searchForMedia = async (req,res) => {
    try {
        const {query} = req.params;
        const response = await fetch(`https://api.deezer.com/search?q=${query}`);
        const json = await response.json()

        let mediaObject = {
            songs: [],
            albums: [],
            artists: []
        };

        json.data.forEach((item) => {
            console.log(item.title,'tit')
            if(item.title.toLowerCase().includes(query.toLowerCase())){
                mediaObject.songs.push(item);
            }else if(!mediaObject.albums.some(album => album.id === item.album.id ) && item.album.title.toLowerCase().includes(query.toLowerCase())){
                mediaObject.albums.push(item.album);
            }else if(!mediaObject.artists.some(artist =>  artist.id === item.artist.id) && item.artist.name.toLowerCase().includes(query.toLowerCase())){
                mediaObject.artists.push(item.artist);
            }
        })

        res.status(200).json(mediaObject)
    }catch (error) {
        console.log(error,'error')
    }
}


module.exports = {getRecentMedia,getTracks,getAlbum,getEachSong,searchForMedia}