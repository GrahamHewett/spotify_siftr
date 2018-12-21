import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import queryString from "query-string";
import Header from "./frontend/views/Header";
import FetchTracks from "./frontend/data/FetchTracks";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import Buttons from "./frontend/views/Buttons";
import fetchTracksUtil from "./frontend/data/fetchTracksUtil";
// import LoggedInHeader from "./frontend/views/loggedInHeader";
import Slider from "./frontend/views/slider";
// import CreatePLaylist from "./frontend/features/CreatePlaylist.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: "",
      limit: 20,
      genre: "2ihY1sy2Eask1kLJME0UhG"
    };
  }

  componentDidMount() {
    this.getTracks();
  }

  getTracks() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    fetchTracksUtil(accessToken, this.state.limit, this.state.genre).then(
      randomNames => {
        this.setState({
          randomisedTracks: randomNames,
          accessToken
        });
      }
    );
  }
  CreatePlaylist(token, tracks) {
    let trackUris = tracks.map(track => track[5]).join(',');
    this.getUserId(token, trackUris)
}
  getUserId(token, trackUris){
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => this.createNewPlaylist(token, trackUris, data.id));
  }

  createNewPlaylist(token, trackUris, user) {
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
        .then(newPlaylist => this.fillPlaylist(token , trackUris, newPlaylist.id))
}
fillPlaylist(token, trackUris, playlistId) {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=0&uris=${trackUris}`,
    {
        headers: { Authorization: "Bearer " + token},
        method: "POST",
        body: JSON.stringify({uris: trackUris})
    }).then(alert('Rock On! All tracks have been added to Siftr PLaylist on your spotify account.'))
}
  render() {
    if (this.state.accessToken) {
      return (
        // if user is logged in display the code between ? and : otherwise
        <div className="App">
          <UserData acToken={this.state.accessToken} />
          <GenresGrid
            selectedGenre={this.state.genre}
            onClick={playlistId => this.setState({ genre: playlistId })}
          />
          <div className="slider-container">
            <div className="slider-container-box sl">
              <Slider
                limit={this.state.limit}
                onChange={newLimit => this.setState({ limit: newLimit })}
              />
            </div>
            <div className="slider-container-box">
              <Buttons onGenerate={() => this.getTracks()} />
              <button
                onClick={() =>
                  this.CreatePlaylist(
                    this.state.accessToken,
                    this.state.randomisedTracks
                  )
                }
              >
                Add to your PLaylist{" "}
              </button>
            </div>
          </div>
          {<UserData acToken={this.state.accessToken} /> ? (
            <div>
              <FetchTracks tracks={this.state.randomisedTracks} />
            </div>
          ) : (
            <div>
              <button
                onClick={() => this.goToSpotify()}
                style={{ padding: "20px", fontSize: "50px", marginTop: "20px" }}
              >
                Sign in with Spotify
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }
  }
}
export default App;
