import {useState} from "react";
import {useAuthContext} from "../context/useAuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null)
    const {setAuthUser} = useAuthContext()
    const [success,setSuccess] = useState(null)

    const handleErrors = (username,password) => {
        if (!username || !password){
            setError({message:'Invalid data fill all gaps!'});
            return false;
        }else{
            return true;
        }
    }


    const login = async (password,username) => {
        setLoading(true);
        try {

            const success = handleErrors(username,password)
            if(!success) return;
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            const json = await response.json()

            if (json.error){
                throw new Error(json.error)
            }

            if (response.ok){
                setError(null)
                setSuccess('User successfully logged in')
                setTimeout(() => {
                    localStorage.setItem('user',JSON.stringify(json))
                    setAuthUser(json);
                },1500)
            }


        }catch (error){
            setError({message:error.message})
            console.log(error.message)
        }finally {
            setLoading(false)
        }
    }
    return {loading,error,success,login};
}
export default useLogin;