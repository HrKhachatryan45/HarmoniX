import {useAuthContext} from "../context/useAuthContext";

const useRemoveFromFavourites = () => {
    const {setAuthUser} = useAuthContext();
    const removeFromFavourites = async (mediaId,mediaType) => {
        try {
            const response = await fetch(`/api/media/removeFromFavourites/${mediaId}/${mediaType}`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
            })
            const json = await response.json();
            if (response.ok){
                localStorage.setItem('user',JSON.stringify(json))
                setAuthUser(json)
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return {removeFromFavourites}
}
export default useRemoveFromFavourites;