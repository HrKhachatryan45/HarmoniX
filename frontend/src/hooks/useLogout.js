import {useState} from "react";
import {useAuthContext} from "../context/useAuthContext";

const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
            });

            const json = await response.json()

            if (json.error){
                throw new Error(json.error)
            }

            if (response.ok){
                    localStorage.removeItem('user')
                    setAuthUser(null)
            }


        }catch (error){
            console.log(error.message)
        }finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }
    return  {logout,loading}
}




export default useLogout;