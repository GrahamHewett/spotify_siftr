import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./frontend/views/landingPage";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import fetchTracksUtil from "./frontend/data/fetchTracksUtil";
import FetchTracks from "./frontend/data/FetchTracks";
import createPlaylist from "./frontend/features/CreatePlaylist.js";

export default function App() {

  const [genre, setGenre] = useState("2ihY1sy2Eask1kLJME0UhG");
  const [limit, setLimit] = useState(5);
  const [accessToken, setAccessToken] = useState(null);
  const [randomisedTracks, setRandomisedTracks] = useState(null);
  const [playlistName, setPlaylistName] = useState("Siftr Playlist");

function logOut() {
  setAccessToken(null)
  setLimit(0);
  // console.log('url is ', window.location.href.split('?')[0]);
  // console.log('alt url is ', window.location.pathname);
  window.history.pushState({}, document.title, window.location.pathname) //pushState or replaceState()?
}
  
  useEffect(() => {
    console.log('useEffect ran', document.location.search)
    if (document.location.search) setAccessToken(new URLSearchParams(document.location.search.substring(1)).get("access_token"))
    if (!accessToken) return;
    async function initalTracks() {
      const tracks = await fetchTracksUtil(accessToken, limit, genre);
      setRandomisedTracks(tracks);
    }
    initalTracks()
  }, [accessToken, limit, genre])

const LoggedInContent = () => {
  console.log('tracks are', randomisedTracks)
  if (accessToken) {
    return <div>
      <UserData acToken={accessToken} logOut={() => logOut()} />
      <GenresGrid onClick={playlistId => setGenre(playlistId)}/>
      <div className="button-flex">
        <button className="button-orange" onClick={() => console.log('generate Playlist')}>Generate new Playlist</button>
          <button className="button-green" onClick={() => createPlaylist(accessToken, randomisedTracks)}>
            Add Playlist to your Spotify
          </button>
      </div>
    <h2>Enter playlist name: <input type='text' value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} /></h2>
    <FetchTracks tracks={randomisedTracks}/>
    </div>
  } return null;
}
      return (
        <div className="App">
          { accessToken ? <LoggedInContent /> : <LandingPage />}
        </div>
          // <FetchTracks tracks={randomisedTracks} />
      );
}