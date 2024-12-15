import {useState} from "react";
import {useAuthContext} from "../context/useAuthContext";

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)
    const {setAuthUser} = useAuthContext()
    const [success,setSuccess] = useState(null)
    const handleErrors = ({fullName,username,password,email,confirmPassword}) => {
        if (!fullName || !username || !password || !email || !confirmPassword){
            setError({message:'Invalid data fill all gaps!'});
            return false;
        }else{
            return true;
        }
    }

    const signup = async ({fullName,username,password,email,confirmPassword}) => {
        setLoading(true);
        try {

            const success = handleErrors({fullName,username,password,email,confirmPassword})
            if(!success) return;
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({fullName, username, password, email, confirmPassword}),
            });

            const json = await response.json()

            if (json.error){
                throw new Error(json.error)
            }

            if (response.ok){
                setError(null)
                setSuccess('User successfully registered')
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
    return  {signup,loading,error,success}
}




export default useSignup;