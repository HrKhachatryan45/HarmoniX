import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useAuthContext} from "./context/useAuthContext";
import MusicPlayerData from "./pages/MusicPlayerData";
import SongData from "./pages/SongData";
import SearchResults from "./pages/searchResults";
function App(props) {
    const {authUser} = useAuthContext()
    return (
        <BrowserRouter>
           <Routes>
               <Route element={authUser?<Home/>:<Navigate to={'/login'}/>} path={'/'}/>
               <Route element={authUser?<Favourites/>:<Navigate to={'/login'}/> } path={'/favourites'}/>
               <Route element={!authUser?<Signup/>:<Navigate to={'/'}/>} path={'/signup'}/>
               <Route element={!authUser?<Login/>:<Navigate to={'/'}/> } path={'/login'}/>
               <Route element={!authUser?<Navigate to={'/login'}/>:<MusicPlayerData/>} path={'/musicPlayerData/:albumId'}/>
               <Route element={!authUser?<Navigate to={'/login'}/>:<SongData/>} path={'/song/:songId'}/>
               <Route element={!authUser?<Navigate to={'/login'}/>:<SearchResults/>} path={'/search'}/>
           </Routes>
        </BrowserRouter>
    );
}

export default App;