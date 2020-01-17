import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./frontend/views/Header";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import Slider from "./frontend/views/slider";
import fetchTracksUtil from "./frontend/data/fetchTracksUtil";
// import Buttons from "./frontend/views/Buttons";
// import LoggedInHeader from "./frontend/views/loggedInHeader";
// import FetchTracks from "./frontend/data/FetchTracks";
// import CreatePLaylist from "./frontend/features/CreatePlaylist.js";

export default function App() {
  const [limit, setLimit] = useState(10);
  const [genre, setGenre] = useState("2ihY1sy2Eask1kLJME0UhG");
  const [accessToken, setAccessToken] = useState(undefined);
  const [randomisedTracks, setRandomisedTracks] = useState(undefined);

  useEffect(() => {
    setAccessToken(new URLSearchParams(document.location.search.substring(1)).get("access_token"))
    // let parsed = queryString.parse(window.location.search);
    // let accessToken = parsed.access_token;
    if (accessToken) return;
    fetchTracksUtil(accessToken, limit, genre)
      .then(randomNames => {
          setRandomisedTracks(randomNames)
      });
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
  if (!accessToken) {
    return <div>
      <UserData acToken={accessToken} />
      <GenresGrid
      selectedGenre={genre}
      onClick={playlistId => setGenre(playlistId)}
    />
    <div className="slider-container">
      <div className="slider-container-box sl">
        <Slider
          limit={limit}
          onChange={newLimit => setLimit(newLimit)}
        />
      </div>
      <div className="slider-container-box">
        {/* <Buttons onGenerate={() => getTracks()} /> */}
        <button
          onClick={() =>
            showPlaylist(
              accessToken,
              randomisedTracks
            )
          }
        >
          Add to your Playlist{" "}
        </button>
      </div>
    </div>
    </div>
  } return null;
}
      return (
        <div className="App">
          { true ? <LoggedInContent /> : <Header />}
        </div>
          // <FetchTracks tracks={randomisedTracks} />
      );
}