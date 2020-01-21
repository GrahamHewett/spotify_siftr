import React, { useState, useEffect } from "react";
import "./App.css";
import "./frontend/features/slider.css"
import LandingPage from "./frontend/views/landingPage";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import fetchTracks from "./frontend/data/fetchTracks";
import DisplayPlaylist from "./frontend/data/DisplayPlaylist";
import createPlaylist from "./frontend/features/CreatePlaylist.js";

export default function App() {
  console.log('line 11 now', new URLSearchParams(document.location.search.substring(1)).get("access_token"))
  const [genre, setGenre] = useState("2ihY1sy2Eask1kLJME0UhG");
  const [limit, setLimit] = useState(10);
  const [accessToken, setAccessToken] = useState(new URLSearchParams(document.location.search.substring(1)).get("access_token"));
  const [randomisedTracks, setRandomisedTracks] = useState(null);
  const [playlistName, setPlaylistName] = useState("Siftr Playlist");

  function logOut() {
    setAccessToken(null)
    setLimit(0);
    // console.log('url is ', window.location.href.split('?')[0]);
    // console.log('alt url is ', window.location.pathname);
    window.history.pushState({}, document.title, window.location.pathname) //pushState or replaceState()?
  }
  function editPlaylistName(e) {
    e.preventDefault();
    setPlaylistName(e.target.value)
  }
  async function asyncFetchTracks() {
    const tracks = await fetchTracks(accessToken, limit, genre);
    setRandomisedTracks(tracks);
  }

  useEffect(() => {
    console.log("use effect ran")
    if (!accessToken) return;
    asyncFetchTracks()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      { accessToken ? <>
        <UserData token={accessToken} logOut={() => logOut()} />
        <GenresGrid onClick={playlistId => setGenre(playlistId)}/>
        <div className="button-flex">
          <button className="button-orange" onClick={() => asyncFetchTracks()}>Generate new Playlist</button>
            <button className="button-green" onClick={() => createPlaylist(accessToken, randomisedTracks)}>
              Add Playlist to your Spotify
            </button>
        </div>
        <div className="slidecontainer">
          <input type="range" min="10" max="50" className= "slider" id="myRange" 
            value={limit} onChange={(e) => setLimit(e.target.value)}>
          </input>
        <div>Number of Tracks shown: {limit}</div>
    </div>
        <h2>Enter playlist name: <input type='text' value={playlistName} onChange={(e) => editPlaylistName(e)} /></h2>
        <DisplayPlaylist tracks={randomisedTracks}/>
      </>: <LandingPage />}
    </div>
  );
}