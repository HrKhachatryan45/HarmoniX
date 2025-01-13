import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {CiSearch} from "react-icons/ci";
import {LuUser2} from "react-icons/lu";
import {useAuthContext} from "../context/useAuthContext";
import {MdLogout} from "react-icons/md";
import useLogout from "../hooks/useLogout";
import SearchInput from "./SearchInput";
import {IoMdMenu} from "react-icons/io";
import {IoCloseSharp} from "react-icons/io5";

function Navbar({current}) {
    const {authUser} = useAuthContext();

    const {loading,logout} = useLogout();
    const handleLogout =async  () => {
        await logout()
    }

    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [top,setTop] = useState(false)
    // Function to handle scroll
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling down, hide navbar
            setShowNavbar(false);
            setTop(true)
        } else {
            setTop(false)
            // Scrolling up, show navbar
            setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);
    const [openInput,setOpenInput] = useState(false);
    const [openMenu,setOpenMenu] = useState(false);

    const handleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const set = () => {
        if (openMenu){
            document.body.style.overflowY = "hidden"
        }else{
            document.body.style.overflowY = "scroll"
        }
    }

    useEffect(() => {
        set();
    },[openMenu])

    return (
        <div className={`w-full xl:h-[80px] lg:h-[75px] md:h-[70px] sm:h-[60px]  bg-[#1A1A1A] flex items-center justify-between xl:px-10 lg:px-8 md:px-7 sm:px-6 px-5 ${showNavbar?'fixed':'static'} ${top?'-top-32':'top-0'} transition-all duration-500 left-0 z-[999] `}>
            {openMenu && <div
                className={'w-full h-screen backdrop-blur-sm bg-black/50 fixed top-0 pt-10 left-0 z-[999] flex items-center justify-start flex-col'}>
                <IoCloseSharp onClick={() => setOpenMenu(false)}
                              className={'absolute right-5 top-5 text-white text-xl cursor-pointer'}/>

                    <section className={`w-full pl-5 h-10 border-b-2 border-b-white flex items-center justify-start text-[12px] font-playFair font-bold ${current === 'home' ? 'text-red-500 ' : 'text-white'}`}>
                        <Link className={''} to={'/'}>Home</Link></section>
                    <section className={`w-full pl-5 h-10 border-b-2 border-b-white flex items-center justify-start text-[12px]  font-playFair font-bold ${current === 'favourites' ? 'text-red-500 ' : 'text-white'}`}>
                        <Link to={'/favourites'}>Favourites</Link></section>
                    <section className={`w-full pl-5 h-10 border-b-2 border-b-white flex items-center justify-start text-[12px] font-playFair font-bold ${current === 'library' ? 'text-red-500 ' : 'text-white'}`}>
                        <Link to={'/library'}>Library</Link></section>

            </div>}
            {openInput ?
                <section className={'w-full h-fit absolute top-16 left-0 px-2'}><SearchInput/></section> : null}
            <section  className={'xl:w-[18%] lg:w-[18%] md:w-[12%] sm:w-[12%] w-[18%]  flex items-center justify-center'}>
                <div
                    className={'w-fit h-full flex items-center justify-center xl:hidden lg:hidden md:hidden sm:hidden '}>
                    <IoMdMenu onClick={handleMenu} className={'text-white cursor-pointer text-2xl mr-2'}/>
                </div>
                <Link to={'/'}>

                    <div className={'w-[100%] h-full  flex items-center justify-start'}>
                        <img src={'https://res.cloudinary.com/dwfb2j4zw/image/upload/v1729888449/download_r52gi9.png'}
                             className={'xl:w-28 xl:h-28 lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14 mt-1 rounded-full'}/>
                        <h3 className={'text-white xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-roboto'}>HarmoniX</h3>
                    </div>
                </Link>
            </section>
            <div
                className={'xl:w-[34%] lg:w-[34%] md:w-[34%] sm:w-[34%]  h-full  xl:flex lg:flex md:flex sm:flex hidden items-center justify-end'}>
                <SearchInput/>
            </div>
            <ul className={'w-[30%] h-full  xl:flex lg:flex md:flex sm:flex hidden items-center justify-around '}>
                <li className={`xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[11px] font-playFair font-bold ${current === 'home' ? 'text-red-500 underline underline-offset-4' : 'text-white'}`}>
                    <Link to={'/'}>Home</Link></li>
                <li className={`xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[11px]  font-playFair font-bold ${current === 'favourites' ? 'text-red-500 underline underline-offset-4' : 'text-white'}`}>
                    <Link to={'/favourites'}>Favourites</Link></li>
                <li className={`xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[11px] font-playFair font-bold ${current === 'library' ? 'text-red-500 underline underline-offset-4' : 'text-white'}`}>
                    <Link to={'/'}>Library</Link></li>
            </ul>
                <div className={'w-fit h-full flex items-center justify-center relative'}>

                    <CiSearch onClick={()=>setOpenInput(!openInput)} className={'text-white text-2xl mr-2 xl:hidden lg:hidden sm:hidden flex cursor-pointer'}/>
                    <img src={authUser.profileImage} className={'xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-6 sm:h-6 w-7 h-7 rounded-full'}/>
                    <div className={'w-fit h-full flex flex-col items-start justify-center mr-4'}>
                        <h2 className={'text-white xl:text-lg lg:text-md md:text-md sm:text-sm text-sm  xl:flex lg:flex md:flex sm:flex hidden font-bree font-bold ml-2'}>@{authUser.username}</h2>
                    </div>
                    {loading?<span className={'loading loading-md text-red-500'}> </span>: <MdLogout onClick={handleLogout} className={'xl:text-2xl lg:text-xl md:text-lg sm:text-lg text-lg   cursor-pointer text-red-500'} />}

                </div>


        </div>
    )
        ;
}

export default Navbar;