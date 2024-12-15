import React from 'react';
import Navbar from "../components/Navbar";
import {TiHeartFullOutline} from "react-icons/ti";
import {useNavigate} from "react-router-dom";

function SearchResults(props) {
    let mediaObj = JSON.parse(localStorage.getItem("media"));
    const navigate = useNavigate();

    const handleNavigateMusic2 = async (data) => {
        navigate(`/song/${data.id}`);
    };
    const handleNavigateMusic = async (data) => {
        navigate(`/musicPlayerData/${data.id}`);
    };

    return (
        <div>
            <Navbar current={'home'}/>
            <div className={'w-full h-fit flex items-center justify-center xl:mt-24  lg:mt-24 md:mt-24 sm:mt-16 mt-16'}>
                <h1 className={'text-white xl:text-xl lg:text-xl md:text-lg sm:text-lg text-md'}>Search results for "{mediaObj.query}"</h1>
            </div>
            <div className={'w-full h-fit flex flex-col items-start justify-center px-4 mb-5'}>
                <h1 className={'text-white text-xl underline underline-offset-8 mb-5'}>Songs</h1>
                {mediaObj.media.songs && mediaObj.media.songs.length > 0 &&
                    <section className={'w-full flex flex-wrap items-center gap-2'}>
                        {mediaObj.media.songs.map(song => (
                            <div
                                onClick={() => handleNavigateMusic2(song)}
                                className=' xl:h-[250px] lg:h-[230px] md:h-[210px] sm:h-[230px] h-[180px] xl:w-[19.5%] lg:w-[24%] md:w-[32%] sm:w-[49%] w-[48%] rounded-2xl flex items-end relative pl-5 pb-5 justify-start cursor-pointer'
                                style={{
                                    backgroundImage: `url(https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250-000000-80-0-0.jpg)`,
                                    backgroundSize: "100% 100%"
                                }}
                                key={song.id}>
                                <h1 className='text-white font-rubik text-xl'>{song.title}</h1>
                            </div>
                        ))}
                    </section>
                }

                <h1 className={'text-white text-xl underline underline-offset-8 mb-5'}>Albums</h1>
                {mediaObj.media.albums && mediaObj.media.albums.length > 0 &&
                    <section className={'w-full flex flex-wrap items-center gap-2'}>
                        {mediaObj.media.albums.map(album => (
                            <div
                                onClick={() => handleNavigateMusic(album)}
                                className=' xl:h-[250px] lg:h-[230px] md:h-[210px] sm:h-[230px] h-[180px] xl:w-[19.5%] lg:w-[24%] md:w-[32%] sm:w-[49%] w-[48%] rounded-2xl flex items-end relative pl-5 pb-5 justify-start cursor-pointer'
                                style={{
                                    backgroundImage: `url(https://e-cdns-images.dzcdn.net/images/cover/${album.md5_image}/250x250-000000-80-0-0.jpg)`,
                                    backgroundSize: "100% 100%"
                                }}
                                key={album.id}>
                                <h1 className='text-white font-rubik text-xl'>{album.title}</h1>
                            </div>
                        ))}
                    </section>

                }
                <h1 className={'text-white text-xl underline underline-offset-8 mb-5'}>Artist</h1>

                {mediaObj.media.artists && mediaObj.media.artists.length > 0 &&
                    <section className={'w-full flex flex-wrap items-center gap-2'}>
                        {mediaObj.media.artists.map(artist => (
                            <div
                                className=' xl:h-[250px] lg:h-[230px] md:h-[210px] sm:h-[230px] h-[180px] xl:w-[19.5%] lg:w-[24%] md:w-[32%] sm:w-[49%] w-[48%] rounded-md flex items-end relative pl-5 pb-5 justify-start cursor-pointer'
                                style={{
                                    backgroundImage:`url(${artist.picture_medium})`,
                                    backgroundSize: "100% 100%"
                                }}
                                key={artist.id}>
                                <h1 className='text-white font-rubik text-xl'>{artist.name}</h1>
                            </div>
                        ))}
                    </section>
                }

            </div>
        </div>
    );
}

export default SearchResults;