let trackUris;

export default function createPlaylist(token, tracks, playlistName) {
    trackUris = tracks.map(track => track.uri)
    let result = getUserId(token, trackUris, playlistName)
    console.log("result is ", result);
}

function getUserId(token, trackUris, playlistName){
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => createNewPlaylist(token, trackUris, data.id, playlistName))
}

const createNewPlaylist = (token, trackUris, user, playlistName) => {
  return fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: playlistName,
      description: "New Siftr Playlist",
      public: false
    })
  })
    .then(response => response.json())
    .then(newPlaylist => fillPlaylist(token , trackUris, newPlaylist.id, playlistName))
}

const fillPlaylist = (token, trackUris, playlistId, playlistName) => {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=0&uris=${trackUris}`,
    {
        headers: { Authorization: "Bearer " + token},
        method: "POST",
        body: JSON.stringify({uris: trackUris})
    }).then(alert(`Rock On! All tracks have been added to the ${playlistName} playlist on your Spotify account.`))
}