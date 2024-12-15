import {Audio} from "react-loader-spinner";
import React, {useEffect, useState} from 'react';
import { Link, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import useGetAlbumTracks from "../hooks/useGetAlbumTracks";
import {FaPause, FaPlay, FaRegCopyright} from "react-icons/fa";
import {IoArrowDownCircleOutline} from "react-icons/io5";
import {PiDotsThreeCircleVertical, PiDotsThreeOutlineFill} from "react-icons/pi";
import {TiHeartFullOutline, TiHeartOutline} from "react-icons/ti";
import {GrShareOption} from "react-icons/gr";
import {CiShare1} from "react-icons/ci";
import useGetAlbum from "../hooks/useGetAlbum";
import MusicPlayer from "../components/MusicPlayer";
import useAddToFavourites from "../hooks/useAddToFavourites";
import {useAuthContext} from "../context/useAuthContext";
import useRemoveFromFavourites from "../hooks/useRemoveFromFavourites";

function MusicPlayerData(props) {
    const {authUser} = useAuthContext();
    const [isOpened,setIsOpened] = useState(true);
    const {albumId} = useParams();
    const {getAlbumTracks} = useGetAlbumTracks();
    const {getAlbum,loading} = useGetAlbum();
    const [songs,setSongs] = useState([]);
    const [parsedAlbumData,setParsedAlbumData] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [hoveredIndex,setHoveredIndex] = useState(-1);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    }
    const handleMouseLeave = (index) => {
        setHoveredIndex(index);
    }

    useEffect(() => {
        const getAlbumById = async () => {
            const album = await getAlbum(albumId)
            setParsedAlbumData(album);
        }
        getAlbumById()
    }, [albumId]);


    useEffect(() => {
        if (parsedAlbumData){
            console.log(parsedAlbumData)
        }
    }, [parsedAlbumData]);

    useEffect(() => {
        if (parsedAlbumData !==null && parsedAlbumData.id) {
            const getTracks = async () => {
                const tracks = await getAlbumTracks(parsedAlbumData.id);
                setSongs(tracks.data && tracks.data?tracks.data:[]);
            };
            getTracks();
        }
    }, [parsedAlbumData,getAlbumTracks]);



        const getDuration = () => {
            let  totalSeconds = 0;
            songs.forEach(song => {
                totalSeconds+=song.duration;
            })
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return `${hours} hour ${minutes} mins ${seconds} secs`;
        }

        const getDurationForEachSong = (seconds) => {
            const  minutes = Math.floor(seconds/60);
            const secs = seconds % 60;
            const secsR = String(secs).padStart(2,'0');
            return `${minutes}:${secsR}`;
        }

    const handleShare = async (url, title) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url
                });
                console.log('Content shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web Share API not supported in this browser.');
            // Fallback sharing method can be implemented here, e.g., copy URL to clipboard
        }
    };
    const handleShareAlbum = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title:parsedAlbumData.title,
                    url:window.location.href
                });
                console.log('Content shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web Share API not supported in this browser.');
            // Fallback sharing method can be implemented here, e.g., copy URL to clipboard
        }
    };

        const [playingSong,setPlayingSong] = useState(null);
        const [play,setPlay] = useState(false)

        const handlePlayMusic = (songC) => {
                if (playingSong && playingSong.id === songC.id){
                    setPlay(!play);
                }else{
                    setPlay(true);
                    setPlayingSong(songC)
                }
        }
        const handlePlaySongs = () => {
            setPlay(true)
            setPlayingSong(songs[0])
        }

        const onSongChange = (currentIndex) => {
            setPlayingSong(songs[currentIndex])
            setPlay(true)
        }


        const getDate = () => {
            if (parsedAlbumData){
                const date = new Date(parsedAlbumData.release_date)
                const monthNames = [
                    "January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December"
                ];

                const month = monthNames[date.getMonth()];
                const year = date.getFullYear();
                const day = date.getDate();

                return `${month} ${day}, ${year}`;
            }
        }

    const [showNavbar,setShowNavbar] = useState(true);

        const {addToFavourites} = useAddToFavourites();
        const {removeFromFavourites} = useRemoveFromFavourites();
        const handleAddToFavourite =async (mediaId,mediaType) => {
           await addToFavourites(mediaId,mediaType);
        }
    const handleRemoveFromFavourite =async (mediaId,mediaType) => {
        await removeFromFavourites(mediaId,mediaType);
    }

    useEffect(() => {
        console.log(authUser,'authUSer')
    }, [authUser]);

    return (
        <div>
            {showNavbar && <Navbar current={'musicPlayer'}/>}
            { !loading && parsedAlbumData !== null?
                <div className={'w-full xl:mt-24 lg:mt-24 md:mt-20 sm:mt-20 mt-16 h-fit flex items-center justify-center '}>
                    <section className={'xl:w-[85%] lg:w-[85%] md:w-[85%] sm:w-[95%] w-[95%] h-fit flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col  xl:items-start lg:items-start md:items-start sm:items-center items-center xl:justify-between lg:justify-between md:justify-between sm:justify-center justify-center '}>
                        <div className={'xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[100%] w-[100%] h-fit   flex flex-col  justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center '}>
                            <img className={'xl:w-60 lg:w-52 md:w-40 sm:w-52 w-52 xl:h-60 lg:h-52 md:h-40 sm:h-52 h-52  rounded-md'} src={parsedAlbumData.cover_medium}/>
                            <div className={'w-full h-fit flex flex-col  justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center'}>
                                <h2 className={'text-white xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] xl:mt-6 lg:mt-5 md:mt-4 sm:mt-3 mt-3 font-roboto mb-2'}>Artist</h2>
                                <section className={'w-full h-fit flex flex-col  justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center'}>
                                    <img src={parsedAlbumData.artist.picture_medium}
                                         className={'xl:w-[250px] lg:w-[220px] md:w-[150px] sm:w-[120px] w-[120px] xl:h-[250px] lg:h-[220px] md:h-[150px] sm:h-[120px] h-[120px] rounded-full '}/>
                                </section>
                                <div className={'xl:w-[250px] lg:w-[220px] md:w-[150px] sm:w-full w-full h-fit flex items-center justify-center'}>
                                    <h2 className={'text-white  font-roboto xl:text-xl lg:text-lg md:text-md sm:text-sm text-[10px] mt-3'}>{parsedAlbumData.artist.name}</h2>
                                </div>
                            </div>
                        </div>
                        <div className={'xl:w-[75%] lg:w-[75%] md:w-[75%] sm:w-[100%] w-[100%] xl:h-[86.5vh] lg:h-[86.5vh] md:h-[86.5vh] sm:h-fit h-fit xl:pb-32 lg:pb-32 md:pb-28 sm:pb-14 pb-14  flex flex-col  items-start justify-start overflow-auto '}>
                        <section className={'w-full  h-fit  flex flex-col  justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center'}>
                                <h1 className={'xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-md text-white font-rubik font-medium'}>{parsedAlbumData.title}</h1>
                                <h3 className={'font-roboto xl:text-md lg:text-md md:text-sm sm:text-sm text-[12px] font-medium text-[#818c94] mt-1'}>Made
                                    by {parsedAlbumData.artist.name}</h3>
                                <section
                                    className={'w-fit h-fit flex items-center font-roboto text-[#818c94] xl:text-[12px] lg:text-[11px] md:text-[10px] sm:text-[9px] text-[8px] mt-1 justify-start'}>
                                    <span>{songs.length} songs </span>
                                    <span className={'mx-2'}>|</span>
                                    <span>{getDuration()}</span>
                                </section>
                                <section className={'w-full h-fit flex items-center justify-between mt-2'}>
                                    <button onClick={handlePlaySongs} style={{backgroundImage: `linear-gradient(180deg, #ff8d76 0, #ff0c55)`}}
                                            className={'xl:w-[120px] lg:w-[110px] md:w-[100px] sm:w-[85px] w-[75px] xl:h-[45px] lg:h-[41px] md:h-[37px] sm:h-[34px] h-[30px] rounded-full flex items-center justify-center mt-2 xl:text-sm lg:text-sm md:text-sm sm:text-[12px] text-[8px] text-white'}>
                                        <FaPlay className={'xl:mr-2 lg:mr-2 md:mr-2 sm:mr-0 mr-[2px] xl:text-md lg:text-md md:text-[12px] sm:text-[12px] text-[10px] '}/> Play Songs
                                    </button>
                                    <section
                                        className={'w-fit h-fit flex items-center justify-center text-white xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl relative'}>
                                        {openMenu && <div
                                            className={'xl:w-[180px] lg:w-[160px] md:w-[140px] sm:w-[120px] w-[110px] xl:h-[170px] lg:h-[150px] md:h-[135px] sm:h-[120px] h-[100px] xl:-left-[180px] lg:-left-[160px] md:-left-[140px] sm:-left-[120px] -left-[105px] absolute rounded-lg flex flex-col items-center justify-center '}
                                            style={{background: `rgb(75, 75, 81)`}}>
                                            {authUser.media.albums && authUser.media.albums.some((album) => album.mediaId === albumId) ?
                                                <section onClick={() => handleRemoveFromFavourite(albumId, 'album')}
                                                         className={'w-full xl:h-[40px] lg:h-[37px] md:h-[34px] sm:h-[31px] h-[28px] text-white cursor-pointer flex items-center  justify-start font-roboto font-medium hover:bg-black px-3 '}>
                                                    <TiHeartFullOutline className={'xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-red-500'}/>
                                                    <span className={'xl:text-[11px] lg:text-[11px] md:text-[11px] sm:text-[10px] text-[4px] ml-2'}>Remove From Favourites</span>
                                                </section> :
                                                <section onClick={() => handleAddToFavourite(albumId, 'album')}
                                                         className={'w-full xl:h-[40px] lg:h-[37px] md:h-[34px] sm:h-[31px] h-[28px] text-white cursor-pointer flex items-center  justify-start font-roboto font-medium hover:bg-black px-3 '}>
                                                    <TiHeartOutline className={'xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg'}/>
                                                    <span className={'xl:text-[11px] lg:text-[11px] md:text-[11px] sm:text-[10px] text-[6px] ml-2'}>Add to Favourites</span>
                                                </section>}
                                            <section
                                                onClick={handleShareAlbum}
                                                className={'w-full xl:h-[40px] lg:h-[37px] md:h-[34px] sm:h-[31px] h-[28px] text-white cursor-pointer flex items-center  justify-start font-roboto font-medium hover:bg-black px-3 '}>
                                                <GrShareOption className={'xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg'}/>
                                                <span className={'xl:text-[11px] lg:text-[11px] md:text-[11px] sm:text-[10px] text-[6px] ml-2'}>Share</span>
                                            </section>
                                        </div>}
                                        <PiDotsThreeCircleVertical onClick={() => setOpenMenu(!openMenu)}
                                                                   className={'ml-2 cursor-pointer'}/>
                                    </section>
                                </section>
                            </section>
                            <div  className={'w-full h-fit flex flex-col  justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center  mt-4'}>
                                {songs.map((song, index) => (
                                    <section key={index}
                                             onMouseEnter={() =>handleMouseEnter(index)}
                                             onMouseLeave={() =>handleMouseLeave(index)}
                                        className={`w-full xl:h-[45px] lg:h-[42px] md:h-[39px] sm:h-[35px] h-[31px] rounded-md  flex items-center justify-between xl:px-4 lg:px-4 md:px-3 sm:px-2 px-2 albumItem`}
                                        style={{background:(play && playingSong.id === song.id)? ` rgba(57, 57, 55,1) ` :index % 2 === 0 ? `rgba(30, 30, 30, 1)` : `rgba(44, 44, 44, 1)`}}>
                                        <div className={'flex items-center justify-center'}>
                                            {hoveredIndex === index ?(playingSong && playingSong.id === song.id && play ?<FaPause  className={'xl:text-md lg:text-md md:text-md sm:text-md text-sm text-red-500 cursor-pointer'} onClick={() => handlePlayMusic(song)}/>  :<FaPlay className={'xl:text-md lg:text-md md:text-md sm:text-md text-sm  text-red-500 cursor-pointer'} onClick={() => handlePlayMusic(song)}/>  ):
                                                (play && playingSong.id === song.id?(
                                                    <Audio
                                                        height="20"
                                                        width="20"
                                                        color="rgba(239,68,68,1)"
                                                        ariaLabel="audio-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="wrapper-class"
                                                        visible={true}
                                                    />
                                                ):  <p className={'xl:text-md lg:text-md md:text-sm sm:text-sm text-sm text-[#A9A9A9]  font-roboto m-0'}>{index + 1}</p>)}
                                            <Link to={`/song/${song.id}`}
                                                  className={'mt-1 ml-3 text-white xl:text-[13px] lg:text-[12px] md:text-[10px] sm:text-[9px] text-[9px] font-roboto hover:underline'}>{song.title}</Link>
                                        </div>
                                        <div className={'flex items-center justify-center'}>
                                            {hoveredIndex === index ? (
                                                authUser.media.songs && authUser.media.songs.some((songX) => Number(songX.mediaId) === song.id ) ?
                                                    <TiHeartFullOutline onClick={() => handleRemoveFromFavourite(song.id,'song')} className={'xl:text-[25px] lg:text-[22px] md:text-[20px] sm:text-[17px] text-[14px] text-red-500  font-roboto cursor-pointer'}/> :
                                            <TiHeartOutline onClick={() => handleAddToFavourite(song.id,'song')} className={'xl:text-[25px] lg:text-[22px] md:text-[20px] sm:text-[17px] text-[14px] text-red-500  font-roboto cursor-pointer'}/> ) : <p className={'text-[13px] text-[#A9A9A9]  font-roboto '}>{getDurationForEachSong(song.duration)}</p>}
                                            <CiShare1
                                                onClick={() => handleShare(`/song/${song.id}`, song.title)}
                                                className={'cursor-pointer text-red-500 xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[10px] ml-2'}/>
                                        </div>
                                    </section>
                                ))}
                            </div>
                            <div className={'w-fit h-fit flex flex-col items-start justify-start'}>
                                <h3 className={'text-white mt-4 xl:text-sm lg:text-sm md:text-sm sm:text-sm text-[12px] font-roboto'}>{getDate()}</h3>
                                <h3 className={'text-white  xl:text-sm lg:text-sm md:text-sm sm:text-sm text-[12px] flex items-center mt-1 justify-center font-roboto'}><FaRegCopyright /> {parsedAlbumData.label}</h3>
                            </div>
                        </div>
                    </section>
                </div> : <div className={'w-full h-fit xl:mt-24 lg:mt-24 md:mt-16 sm:mt-20 mt-20 flex items-center justify-center'}>
                    <span className={'loading loading-lg loading-bars text-red-500'}></span>
                </div>}
            <MusicPlayer setShowNavbar={setShowNavbar} isAlbum={true} onSongChange={onSongChange} isOpened={isOpened} play={play} setPlay={setPlay} song={playingSong} currentIndex={playingSong && songs.findIndex((song) =>song.id ===playingSong.id )} songs={songs}/>
        </div>
    );
}

export default MusicPlayerData;