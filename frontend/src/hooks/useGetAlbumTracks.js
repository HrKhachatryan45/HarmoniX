import {useState} from "react";

const useGetAlbumTracks = () => {
    const getAlbumTracks = async (trackId) => {
        try {
            const response = await fetch(`/api/deezer/getTracks/${trackId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            return json; // Adjust based on actual response structure
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return {getAlbumTracks}
}
export default useGetAlbumTracks;