export default function fetchTracksUtil(token, limit, genre) {
  return fetch(
    `https://api.spotify.com/v1/playlists/${genre}/tracks`,
    {
      headers: { Authorization: "Bearer " + token }
    }
  )     
    .then(response => response.json())
    .then(ptracks => {
      if (ptracks && ptracks.length > 0) {
        let pnames = ptracks.items.map(song => [
          song.track.name,
          song.track.artists[0].name,
          song.track.album.name,
          song.track.duration_ms,
          song.track.popularity,
          song.track.uri
        ]);
        let randomNames = [];
        for (let i = 0; i < limit; i++) {
          var randomNumber = Math.floor(Math.random() * pnames.length - 1);
          randomNames.push(pnames[randomNumber]);
        }
        return randomNames;
      }
    });
}
