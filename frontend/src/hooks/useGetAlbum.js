import {useState} from "react";

const useGetAlbum = () => {
    const [loading,setLoading] = useState(false)
    const getAlbum = async (albumId) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/deezer/getAlbum/${albumId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();

            return json;
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally {
            setLoading(false);
        }
    }
    return {getAlbum,loading}
}
export default useGetAlbum;