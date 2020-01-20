let trackUris;
let playlistName = "Dummy Name"

export default function createPlaylist(token, tracks) {
    trackUris = tracks.map(track => track.uri)
    let result = getUserId(token, trackUris)
    console.log("result is ", result);
}

function getUserId(token, trackUris){
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => createNewPlaylist(token, trackUris, data.id))
}

const createNewPlaylist = (token, trackUris, user) => {
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
    .then(newPlaylist => fillPlaylist(token , trackUris, newPlaylist.id))
}

const fillPlaylist = (token, trackUris, playlistId) => {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=0&uris=${trackUris}`,
    {
        headers: { Authorization: "Bearer " + token},
        method: "POST",
        body: JSON.stringify({uris: trackUris})
    }).then(alert(`Rock On! All tracks have been added to ${playlistName} Playlist on your spotify account.`))
}