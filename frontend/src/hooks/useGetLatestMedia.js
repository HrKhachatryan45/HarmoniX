import {useEffect, useState} from "react";

const useGetLatestMedia = () => {
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getAlbum = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/deezer/getMedia');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setAlbums(json.hasOwnProperty('albums')?json.albums.data:json); // Adjust based on actual response structure
                console.log(json,'jsom')
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };
        getAlbum()
    }, []);
        return {albums,loading}
}
export default useGetLatestMedia