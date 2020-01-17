    fetch('https://api.spotify.com/v1/playlists/2KSM2x2rFmY4GKWwRm9qRg/tracks', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(ptracks => {
        let pnames = ptracks.items.map((song => song.track.name))
        let randomNames = []
        let limit = 3;
        for(let i = 0; i < limit; i++){
          randomNames.push(pnames[Math.floor(Math.random()*pnames.length)]);
        }
          console.log(randomNames);
      })