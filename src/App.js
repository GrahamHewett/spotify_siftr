import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./frontend/views/landingPage";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import fetchTracksUtil from "./frontend/data/fetchTracksUtil";
import FetchTracks from "./frontend/data/FetchTracks";
// import CreatePLaylist from "./frontend/features/CreatePlaylist.js";

export default function App() {
  const [genre, setGenre] = useState("2ihY1sy2Eask1kLJME0UhG");
  const [limit, setLimit] = useState(5);
  const [accessToken, setAccessToken] = useState(null);
  const [randomisedTracks, setRandomisedTracks] = useState(null);

  function logOut() {
    setAccessToken(null)
    setLimit(0);
    // console.log('url is ', window.location.href.split('?')[0]);
    // console.log('alt url is ', window.location.pathname);
    window.history.pushState({}, document.title, window.location.pathname) //pushState or replaceState()?
  }

  useEffect(() => {
    console.log('useEffect ran')
    setAccessToken(new URLSearchParams(document.location.search.substring(1)).get("access_token"))
    console.log(accessToken, ' is accessToken' )
    if (!accessToken) return;
    async function initalTracks() {
      const tracks = await fetchTracksUtil(accessToken, limit, genre);
      setRandomisedTracks(tracks);
    }
    initalTracks()
  }, [accessToken, limit, genre])

  const showPlaylist = (token, tracks) => {
    let trackUris = tracks.map(track => track[5]).join(',');
    getUserId(token, trackUris)
}
  const getUserId = (token, trackUris) => {
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => createNewPlaylist(token, trackUris, data.id));
  }

  const createNewPlaylist = (token, trackUris, user) => {
    return fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: "Siftr Playlist",
        description: "New Siftr Playlist",
        public: false
      })
    })
        .then(response => response.json())
        .then(newPlaylist => fillPlaylist(token , trackUris, newPlaylist.id))
}
const fillPlaylist = (token, trackUris, playlistId) => {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=0&uris=${trackUris}`,
    {
        headers: { Authorization: "Bearer " + token},
        method: "POST",
        body: JSON.stringify({uris: trackUris})
    }).then(alert('Rock On! All tracks have been added to Siftr PLaylist on your spotify account.'))
}

const LoggedInContent = () => {
  console.log('tracks are', randomisedTracks)
  if (accessToken) {
    return <div>
      <UserData acToken={accessToken} logOut={() => logOut()} />
      <GenresGrid selectedGenre={genre} onClick={playlistId => setGenre(playlistId)}/>
      
        <div className="button-flex">
            <button className="button-orange" onClick={() => 'generate Playlist'}>Generate new Playlist</button>
          <button className="button-green" onClick={() => showPlaylist(accessToken, randomisedTracks)}>
          Add Playlist to your Spotify
          </button>
        </div>
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