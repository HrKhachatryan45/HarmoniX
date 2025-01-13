import {useState} from "react";

const useSearch = () => {
    const [loading,setLoading] = useState(false)
    const search = async (query) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/deezer/search/${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();

            console.log(json,'kss')
            return json;
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally {
            setLoading(false);
        }
    }
    return {search,loading}
}
export default useSearch;