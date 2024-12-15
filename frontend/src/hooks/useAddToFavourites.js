import {useAuthContext} from "../context/useAuthContext";

const useAddToFavourites = () => {
    const {setAuthUser} = useAuthContext();
    const addToFavourites = async (mediaId,mediaType) => {
        try {
         const response = await fetch(`/api/media/addToFavourites/${mediaId}/${mediaType}`,{
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
    return {addToFavourites}
}
export default useAddToFavourites;