import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {useAuthContext} from "../context/useAuthContext";
import {useNavigate} from "react-router-dom";
import useGetAlbum from "../hooks/useGetAlbum";
import useGetEachSong from "../hooks/useGetEachSong";
import {TiHeartFullOutline, TiHeartOutline} from "react-icons/ti";
import useRemoveFromFavourites from "../hooks/useRemoveFromFavourites";

function Favourites(props) {
    const {authUser} = useAuthContext();
    const navigate = useNavigate();

    const handleNavigateMusic = async (data) => {
        navigate(`/musicPlayerData/${data.id}`);
    };
    const handleNavigateMusic2 = async (data) => {
        navigate(`/song/${data.id}`);
    };

    const {getAlbum} = useGetAlbum();
    const {getEachSong} = useGetEachSong();
    const [albums, setAlbums] = useState(null);
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [showAlbums, setShowAlbums] = useState(true);

    const {removeFromFavourites} = useRemoveFromFavourites();

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            const object = {};
            if (authUser?.media?.albums.length > 0) {
                await Promise.all(
                    authUser.media.albums.map(async (album) => {
                        const albumDetails = await getAlbum(album.mediaId);
                        object[album.mediaId] = albumDetails;
                    })
                );
            }
            setAlbums(object);
            setLoading(false);
        };
        fetchAlbums();
    }, [authUser?.media?.albums]);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading2(true);
            const object = {};
            if (authUser?.media?.songs.length > 0) {
                await Promise.all(
                    authUser.media.songs.map(async (song) => {
                        const songDetails = await getEachSong(song.mediaId);
                        object[song.mediaId] = songDetails;
                    })
                );
            }
            setSongs(object);
            setLoading2(false);
        };
        fetchSongs();
    }, [authUser?.media?.songs]);

    const handleRemoveFavourites = async (mediaType, mediaId, e) => {
        e.stopPropagation();
        await removeFromFavourites(mediaId, mediaType);
    };

    return (
        <div>
            <Navbar current={'favourites'} />


                <div className='w-full h-fit flex items-center justify-start  xl:mt-24  lg:mt-24 md:mt-24 sm:mt-16 mt-16 lg:mb-5 md:mb-5 sm:mb-5 mb-5 px-2 '>
                    <h1
                        onClick={() => setShowAlbums(true)}
                        className={`cursor-pointer xl:text-xl lg:text-xl md:text-lg sm:text-md text-md ${showAlbums ? 'underline text-red-500' : 'text-white'} underline-offset-8 font-roboto xl:mr-5 lg:mr-5 md:mr-5 sm:mr-5 mr-5`}>
                        Favourite Albums
                    </h1>
                    <h1
                        onClick={() => setShowAlbums(false)}
                        className={`cursor-pointer xl:text-xl lg:text-xl md:text-lg sm:text-md text-md ${showAlbums ? 'text-white' : 'underline text-red-500'} underline-offset-8 font-roboto`}>
                        Favourite Songs
                    </h1>
                </div>

                {/* Display Albums */}
                {showAlbums ? (
                    authUser.media.albums.length > 0 ? (
                        <section className='w-[100%] flex flex-wrap gap-2 px-2'>
                            {!loading ? (
                                Object.keys(albums).length > 0 && authUser.media.albums.map((albumS) => {
                                    const album = albums[albumS.mediaId];
                                    if (!album) return null;
                                    return (
                                        <div
                                            onClick={() => handleNavigateMusic(album)}
                                            className=' xl:h-[250px] lg:h-[230px] md:h-[210px] sm:h-[230px] h-[180px] xl:w-[19.5%] lg:w-[24%] md:w-[32%] sm:w-[49%] w-[48%] rounded-2xl flex items-end relative pl-5 pb-5 justify-start cursor-pointer'
                                            style={{backgroundImage: `url(${album.cover_big})`, backgroundSize: "100% 100%"}}
                                            key={album.id}>
                                            <section
                                                onClick={(e) => handleRemoveFavourites('album', album.id, e)}
                                                className='w-fit h-fit bg-white/30 backdrop-blur-md p-2 absolute right-4 top-4 rounded-md'>
                                                <TiHeartFullOutline className='xl:text-2xl text-red-500' />
                                            </section>
                                            <h1 className='text-white font-rubik text-xl'>{album.title}</h1>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='w-full h-fit mt-24 flex items-center justify-center'>
                                    <span className='loading loading-lg loading-bars text-red-500'></span>
                                </div>
                            )}
                        </section>
                    ) : (
                        <div className='w-full h-fit flex items-center justify-start mt-5 px-2'>
                            <h2 className='text-white xl:text-lg lg:text-lg md:text-md sm:text-md text-md font-roboto'>No Albums</h2>
                        </div>
                    )
                ) : (

                    /* Display Songs */
                    authUser.media.songs.length > 0 ? (
                        <section className='w-[100%] flex flex-wrap gap-2 px-2 '>
                            {!loading2 ? (
                                Object.keys(songs).length > 0 && authUser.media.songs.map((songS) => {
                                    const song = songs[songS.mediaId];
                                    if (!song) return null;
                                    return (
                                        <div
                                            onClick={() => handleNavigateMusic2(song)}
                                            className=' xl:h-[250px] lg:h-[230px] md:h-[210px] sm:h-[230px] h-[180px] xl:w-[19.5%] lg:w-[24%] md:w-[32%] sm:w-[49%] w-[48%] rounded-2xl flex items-end relative pl-5 pb-5 justify-start cursor-pointer'
                                            style={{
                                                backgroundImage: `url(https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250-000000-80-0-0.jpg)`,
                                                backgroundSize: "100% 100%"
                                        }}
                                            key={song.id}>
                                            <section
                                                onClick={(e) => handleRemoveFavourites('song', song.id, e)}
                                                className='w-fit h-fit bg-white/30 backdrop-blur-md p-2 absolute right-4 top-4 rounded-md'>
                                                <TiHeartFullOutline className='xl:text-2xl text-red-500' />
                                            </section>
                                            <h1 className='text-white font-rubik text-xl'>{song.title}</h1>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='w-full h-fit mt-24 flex items-center justify-center'>
                                    <span className='loading loading-lg loading-bars text-red-500'></span>
                                </div>
                            )}
                        </section>
                    ) : (
                        <div className='w-full h-fit flex items-center justify-start mt-5 px-2'>
                            <h2 className='text-white xl:text-lg lg:text-lg md:text-md sm:text-md text-md font-roboto'>No Songs</h2>
                        </div>
                    )
                )}
        </div>

    );
}

export default Favourites;
