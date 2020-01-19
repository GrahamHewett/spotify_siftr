import axios from 'axios';

export default function fetchTracksUtil(token, limit, genre) {
  return axios(`https://api.spotify.com/v1/playlists/${genre}/tracks`,
    { headers: { Authorization: "Bearer " + token }}
  )     
    .then(response => response.data.items)
    .then(items => {
      let songs = items.map(item => {
        let {name, duration_ms, popularity, uri, album, artists} = item.track;
        return {name, duration_ms, popularity, uri, album: album.name, artist: artists[0].name}
      })
      songs.length = limit;
      console.log("limited songs are ", songs);
      return songs;
    })
}