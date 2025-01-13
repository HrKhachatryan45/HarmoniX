import {useState} from "react";

const useGetEachSong = () => {
    const [loading,setLoading] = useState(false)
    const getEachSong = async (songId) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/deezer/getSong/${songId}`);
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
    return {getEachSong,loading}
}
export default useGetEachSong;