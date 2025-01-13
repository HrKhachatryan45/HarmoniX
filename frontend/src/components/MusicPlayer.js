import React, {useEffect, useRef, useState} from 'react';
import {TiArrowShuffle, TiHeartFullOutline, TiHeartOutline} from "react-icons/ti";
import {FaAngleDown, FaAngleUp, FaPause, FaPlay} from "react-icons/fa";
import {MdSkipNext, MdSkipPrevious} from "react-icons/md";
import {IoIosPause, IoIosPlay} from "react-icons/io";
import {PiRepeatBold} from "react-icons/pi";
import _ from 'lodash';
import {HiOutlineVolumeOff, HiOutlineVolumeUp} from "react-icons/hi";
import {useAuthContext} from "../context/useAuthContext";
import useAddToFavourites from "../hooks/useAddToFavourites";
import useRemoveFromFavourites from "../hooks/useRemoveFromFavourites";
function MusicPlayer({isOpened,song,play,currentIndex,songs,onSongChange,setPlay,isAlbum,setShowNavbar}) {
    const audioRef = useRef(null);
    const url = `https://e-cdns-images.dzcdn.net/images/cover/${song && song.md5_image}/250x250-000000-80-0-0.jpg`
    const [shuffle,setShuffle] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isRepeating,setIsRepeating] = useState(false);
    const [volume,setVolume] = useState(1)
    const [isMute,setIsMute] = useState(false);
    useEffect(() => {
        const audio = audioRef.current;

        if (audio){
            const handlePlayPause = async () => {
                try {
                    if (play) {
                        await audio.play();
                    } else {
                        audio.pause();
                    }
                } catch (err) {
                    console.error("Error with play/pause:", err);
                }
            };

            handlePlayPause();
            // Update duration when audio is loaded
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            // Update current time as audio plays
            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

                const handleEnded = () => {
                   if (isAlbum){
                       if(isRepeating){
                           audioRef.current.currentTime = 0; // Reset to the beginning
                           audioRef.current.play(); // Play the song again
                           setIsRepeating(false)
                       }else if(shuffle){
                           let randomIndex;
                           do {
                               randomIndex = _.random(0, songs.length - 1);
                           } while (randomIndex === currentIndex); // Prevent playing the same song
                           onSongChange(randomIndex);
                       }else if (currentIndex < songs.length - 1) {
                           onSongChange(currentIndex + 1);
                       }else  {
                           setPlay(false)
                       }
                   }else{
                       setPlay(false)
                   }
                };


                audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended',handleEnded)
            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    },[play, song,currentIndex &&  currentIndex, songs && songs.length,onSongChange && onSongChange])

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100; // Convert to 0-1 range
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume; // Set the audio volume
        }
    };



    const getStandartTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs =Math.floor( seconds % 60);
        const secsR = String(secs).padStart(2, '0');
        return `${mins}:${secsR}`;
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };
    const handlePlay = () => {
        if (play){
            audioRef.current.pause();
            setPlay(false)
        }else {setPlay(true)
            audioRef.current.play()
        }
    }
    const handlePrev = () => {
        if (currentIndex > 0) {
            onSongChange(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < songs.length - 1) {
            onSongChange(currentIndex + 1);
        }
    };
    const handleRepeat = () => {
        setShuffle(false)
        setIsRepeating(!isRepeating)
    }

    const handleShuffle = () => {
        setShuffle(!shuffle)
    }

    const handleMuteToggle = () => {
        setIsMute(!isMute);
        if (audioRef.current) {
            audioRef.current.volume = isMute ? volume : 0; // Mute or unmute
        }
    };
    const [openClip,setOpenClip] = useState(false);
    const [youtubeUrl,setYoutubeUrl] = useState('');
    useEffect(() => {
        const getYoutubeUrl =async () => {
          if (song){
              const apiKey = 'AIzaSyCXNsq7QApyA18HnREKo8k0xdPF4DsHm14';
              const response =await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${song.title}+${song.artist.name}&type=video&key=${apiKey}`)
              const json = await response.json();
              const videoId = json.items[0].id.videoId;
              setYoutubeUrl(`https://www.youtube.com/embed/${videoId}`);
          }
        }
        getYoutubeUrl()
    }, [song]);

    useEffect(() => {
        console.log(youtubeUrl)
    }, [youtubeUrl]);
    const {authUser} = useAuthContext();
    const {addToFavourites} = useAddToFavourites();
    const {removeFromFavourites} = useRemoveFromFavourites();
    const handleAddToFavourite =async (mediaId,mediaType) => {
        await addToFavourites(mediaId,mediaType);
    }
    const handleRemoveFromFavourite =async (mediaId,mediaType) => {
        await removeFromFavourites(mediaId,mediaType);
    }


    return (
        song && <div className={`w-full xl:h-[85px] lg:h-[85px] md:h-[80px] sm:h-[70px] h-[70px] fixed flex items-center justify-between left-0 ${isOpened ? 'bottom-0' : '-bottom-52'} px-4 `}
                     style={{background: `rgb(60, 59, 59)`}}>
            <audio ref={audioRef} src={song.preview}></audio>
            <div className={'xl:w-[30%] lg:w-[30%] md:w-[30%] sm:w-fit w-fit  flex items-center justify-start'}>
                <img src={url} className={'xl:w-[70px] lg:w-[70px] md:w-[65px] sm:w-[50px] w-[50px] xl:h-[70px] lg:h-[70px] md:h-[65px] sm:h-[50px] h-[50px] rounded-md'} />
                <section className={'pl-2 flex flex-col items-start justify-center'}>
                    <h2 className={'xl:text-md lg:text-md md:text-md sm:text-[10px] text-[10px] text-white font-roboto'}>{song.title}</h2>
                    <h3 className={'text-[#666666] xl:text-sm lg:text-sm md:text-sm sm:text-[10px] text-[10px] font-roboto'}>{song.artist.name}</h3>
                </section>
                <div className={'w-fit h-fit flex items-center justify-center xl:ml-4 lg:ml-4 md:ml-4 sm:ml-2 ml-2'}>
                    { authUser.media.songs && authUser.media.songs.some((songX) => Number(songX.mediaId) === song.id ) ?
                        <TiHeartFullOutline onClick={() => handleRemoveFromFavourite(song.id,'song')} className={'xl:text-[25px] lg:text-[22px] md:text-[20px] sm:text-[17px] text-[14px] text-red-500  font-roboto cursor-pointer'}/> :
                        <TiHeartOutline onClick={() => handleAddToFavourite(song.id,'song')} className={'xl:text-[25px] lg:text-[22px] md:text-[20px] sm:text-[17px] text-[14px] text-red-500  font-roboto cursor-pointer'}/> }
                </div>
            </div>
            <div className={'w-[50%]  h-full flex flex-col items-center justify-center'}>
                <section className={'w-fit h-fit flex items-center justify-center'}>

                    {isAlbum && <>
                        <button
                            onClick={handleShuffle}
                            className={'w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent hover:bg-[#42444A]'}>
                            <TiArrowShuffle className={`xl:text-lg lg:text-lg md:text-lg sm:text-md text-md ${shuffle ? 'text-red-500' : 'text-white'}`}/>
                        </button>

                        <button onClick={handlePrev}
                                className={'w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent hover:bg-[#42444A]'}>
                            <MdSkipPrevious className={'xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-xl'}/></button>
                    </>}
                    <button onClick={handlePlay}
                            className={'w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent hover:bg-[#42444A] mx-1'}>{play ?
                        <IoIosPause className={'xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl'}/> : <IoIosPlay className={'xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl'}/>}</button>
                    {isAlbum && <>
                        <button onClick={handleNext}
                                className={'w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent hover:bg-[#42444A]'}>
                            <MdSkipNext className={'xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-xl'}/></button>
                        <button
                            onClick={handleRepeat}
                            className={'w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent hover:bg-[#42444A]'}>
                            <PiRepeatBold className={`xl:text-lg lg:text-lg md:text-lg sm:text-md text-md ${isRepeating ? 'text-red-500' : 'text-white'}`}/>
                        </button>
                    </>}
                </section>
                <section className={'w-full h-fit flex items-center justify-center'}>
                    <h3 className={'text-white font-roboto xl:text-[13px] lg:text-[13px] md:text-[13px] sm:text-[11px] text-[10px] mr-1'}>{getStandartTime(currentTime)}</h3>
                    <input
                        type={"range"}
                        className={'custom-slider'}
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                    />
                    <h3 className={'text-white font-roboto  xl:text-[13px] lg:text-[13px] md:text-[13px] sm:text-[11px] text-[10px]  ml-1'}>{getStandartTime(duration)}</h3>
                </section>
            </div>
            <div className={'w-[15%] h-full xl:flex lg:flex md:flex sm:hidden hidden items-center justify-center'}>
                {isMute?<HiOutlineVolumeOff onClick={handleMuteToggle} className={'text-xl text-white cursor-pointer'} />:<HiOutlineVolumeUp onClick={handleMuteToggle} className={'text-xl text-white cursor-pointer'} />}
                <input
                    type="range"
                    className={'custom-slider2 mx-2'}
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                />
                <button onClick={() =>{
                    setOpenClip(true)
                    setPlay(false)
                    setShowNavbar(false)
                }} className={'  w-fit h-fit p-2 text-white flex items-center justify-center  rounded-full bg-transparent bg-[#42444A]'}>
                    <FaAngleUp className={'text-white text-lg'}/>
                </button>
            </div>
            {openClip && <div className={'w-full h-screen fixed flex flex-col items-center justify-center top-0 left-0 bg-black z-[999]'}>
                <FaAngleDown onClick={()=>{
                    setShowNavbar(true)
                    setOpenClip(false)
                }} className={'text-white text-xl absolute left-10 top-6 cursor-pointer'}/>

                {youtubeUrl && <iframe className={'w-[500px] h-[350px]'} src={youtubeUrl}>

                </iframe>}
                    </div>}
            </div>
                );
            }

export default MusicPlayer;