// import React, { useEffect, useState } from 'react';
// import Navbar from "../components/Navbar";
// import useGetAlbums from "../hooks/useGetAlbums";
//
// function Home(props) {
//     const {loading,getAlbums} = useGetAlbums();
//     const [albums, setAlbums] = useState([]);
//
//     useEffect(() => {
//         const loadAlbums = async () => {
//             const albumData = await getAlbums('302127');
//             setAlbums(albumData.data); // Adjust based on the actual structure of the response
//         };
//
//         loadAlbums();
//     }, [getAlbums]);
//     useEffect(() => {
//         console.log(albums)
//     },[albums])
//     return (
//         <div>
//             <Navbar current={'home'} />
//
//             <div className={'w-full h-fit flex flex-wrap items-center justify-between'}>
//                 {albums && albums.map((track) => (
//                     <div key={track.id}>
//                         <img src={track.album.cover_medium}  />
//                         <h2>{track.title}</h2>
//                         <audio controls>
//                             <source src={track.preview}/>
//                         </audio>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default Home;

import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Album from "../components/Albums/Album";

function Home(props) {


    return (
        <div>
            <Navbar current={'home'}/>
            <Album/>
        </div>
    );
}

export default Home;