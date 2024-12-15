import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link} from "react-router-dom";
import useLogin from "../hooks/useLogin";
function Login(props) {
    const [show1,setShow1]=useState(false);
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const {loading,error,success,login} = useLogin()
    const handleSubmit =async (ev) => {
        ev.preventDefault();
        await login(password,username);
    }

    return (
        <div className={'w-full h-screen flex items-center justify-center'} style={{backgroundImage:`url(images/img.png)`,backgroundSize:"100% 80%"}}>
            <form onSubmit={handleSubmit}
                  className={'xl:w-[40%] formL xl:h-[70%] lg:w-[45%] lg:h-[70%] md:w-[60%] md:h-[65%] sm:w-[70%] sm:h-[60%] w-[85%] h-[50%] backdrop-blur-sm bg-white/20 rounded-xl px-4 py-4 flex flex-col items-center justify-center relative'}>

                <h2 className={'xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg text-red-500 font-roboto'}>HarmoniX</h2>
                <h1 className={'xl:text-2xl lg:text-xl md:text-lg sm:text-md text-md text-white xl:mb-4 lg:mb-4 md:mb-3 sm:mb-2 mb-2'}>Login</h1>
                <section className={'w-full h-fit flex justify-between xl:mb-3 lg:mb-3 md:mb-2 sm:mb-1 mb-1'}>
                    <input
                        onChange={(ev) => setUsername(ev.target.value)}
                        value={username}
                        type={'text'}
                        placeholder={'Username'}
                        className={'w-[100%] input input-bordered text-white  xl:h-12 lg:h-12 md:h-10 sm:h-8 h-8 bg-transparent border-[1px] border-gray-300 outline-none focus:outline-none xl:text-md lg:text-md md:text-sm sm:text-sm text-[13px]'}/>
                </section>
                    <div className={'w-[100%] h-fit relative flex items-center justify-center'}>
                        {show1?  <FaEyeSlash onClick={() => setShow1(!show1)} className={'xl:text-xl lg:text-xl md:text-lg sm:text-md text-md text-white absolute right-2 cursor-pointer'}/>:<FaEye onClick={() => setShow1(!show1)} className={'xl:text-xl lg:text-xl md:text-lg sm:text-md text-md text-white absolute right-2 cursor-pointer' }/>}
                        <input
                            onChange={(ev) =>setPassword(ev.target.value)}
                            value={password}
                            type={show1?'text':'password'}
                            placeholder={'Password'}
                            className={'w-full input input-bordered text-white  xl:h-12 lg:h-12 md:h-10 sm:h-8 h-8 bg-transparent border-[1px] border-gray-300 outline-none focus:outline-none xl:text-md lg:text-md md:text-sm sm:text-sm text-[13px]'}/>
                    </div>
                <div className={'w-full h-fit flex items-center justify-start'}>
                    <p className={'xl:text-md lg:text-md md:text-sm sm:text-sm  text-sm xl:mt-2 lg:mt-2 md:mt-2 sm:mt-1 mt-1 '}>Don't have an account yet ? <Link to={'/signup'} className={'text-black underline underline-offset-4'}>Signup</Link></p>
                </div>
                <div className={'w-full h-fit flex items-center justify-end'}>
                    <button className={' btn  xl:px-3 xl:py-1 xl:text-md lg:px-3 lg:py-1 lg:text-md md:text-md sm:text-sm text-sm md:px-3 md:py-1 sm:px-2 sm:py-[0.2px] px-2 py-[0.2px] '}>{loading?<span className={'loading xl:loading-md lg:loading-md '}></span>:"Login"}</button>
                </div>
                {error && <div className={'w-fit h-fit  flex items-center justify-center border-2 border-red-400 xl:text-md lg:text-md md:text-md sm:text-sm text-sm text-red-400 rounded-md xl:px-2 lg:px-2 md:px-2 sm:px-1 px-1 xl:py-2 lg:py-2 md:py-2 sm:py-1 py-1 '}>{error.message}</div> }
                {success && <div className={'w-fit h-fit  flex items-center justify-center border-2 border-green-400 xl:text-md lg:text-md md:text-md sm:text-sm text-sm text-green-400 rounded-md xl:px-2 lg:px-2 md:px-2 sm:px-1 px-1 xl:py-2 lg:py-2 md:py-2 sm:py-1 py-1 '}>{success}</div> }
            </form>
        </div>
    );
}

export default Login;