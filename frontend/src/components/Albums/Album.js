import React from 'react';
import Carousel from "nuka-carousel";
import {FaAngleRight} from "react-icons/fa6";
import {FaAngleLeft} from "react-icons/fa";
import useGetLatestMedia from "../../hooks/useGetLatestMedia";
import {useNavigate} from "react-router-dom";

function Album(props) {
    const {albums,loading} = useGetLatestMedia();
    const navigate = useNavigate();
    const handleNavigateMusic =async (data) => {
            navigate(`/musicPlayerData/${data.id}`);
    }

    return (
       !loading ? <Carousel
           defaultControlsConfig={{
               nextButtonClassName: "nextButton",
               nextButtonText: <FaAngleRight/>,
               prevButtonText: <FaAngleLeft/>,
               prevButtonClassName: "prevButton",
               pagingDotsStyle: {display: "none"}
           }}
           slidesToShow={1.8}
           cellAlign={"center"}
           wrapAround={true}
           autoplay={true}
           className={'mt-24'}
           cellSpacing={20}
       >
           {albums && albums.map((album) => (
               <div onClick={() => handleNavigateMusic(album)} className={'w-[100%] xl:h-[300px] lg:h-[270px] md:h-[250px] sm:h-[230px] h-[200px] rounded-2xl flex items-end pl-5 pb-5 justify-start cursor-pointer'}
                    style={{backgroundImage: `url(${album.cover_big})`, backgroundSize: "100% 100%"}} key={album.id}>
                   <h1 className={'text-white font-rubik text-3xl'}>{album.title}</h1>
               </div>
           ))}
       </Carousel> : <div className={'w-full h-fit mt-24 flex items-center justify-center'}>
           <span className={'loading loading-lg loading-bars text-red-500'}></span>
       </div>

    );
}

export default Album;