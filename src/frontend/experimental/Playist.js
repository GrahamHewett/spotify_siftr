// class Playlist extends Component {
//   render() {
//     let playlist = this.props.playlist;
//     return (
//       <div className="playlist">
//         <h2>{playlist.name}</h2>
//         <img src={playlist.imageUrl} alt="" />
//         <ul>
//           {playlist.songs.map(song => (
//             <li>{song.name}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }



{/* <br />
            {this.state.user.name}
            <br /> 
           <h1>{this.state.user.name}'s Playlists</h1>
            {playlistToRender.map((playlist, i) => (
              <Playlist playlist={playlist} index={i} />
            ))}  */}

 // fetch("https://api.spotify.com/v1/me/playlists", {
    //   headers: { Authorization: "Bearer " + accessToken }
    // })
    //   .then(response => response.json())
    //   .then(playlistData => {
    //     let playlists = playlistData.items;
    //     let trackDataPromises = playlists.map(playlist => {
    //       let responsePromise = fetch(playlist.tracks.href, {
    //         headers: { Authorization: "Bearer " + accessToken }
    //       });
    //       let trackDataPromise = responsePromise.then(response =>
    //         response.json()
    //       );
    //       return trackDataPromise;
    //     });
    //     let allTracksDataPromises = Promise.all(trackDataPromises);
    //     let playlistsPromise = allTracksDataPromises.then(trackDatas => {
    //       trackDatas.forEach((trackData, i) => {
    //         playlists[i].trackDatas = trackData.items
    //           .map(item => item.track)
    //           .map(trackData => ({
    //             name: trackData.name,
    //             duration: trackData.duration_ms / 1000
    //           }));
    //       });
    //       return playlists;
    //     });
    //     return playlistsPromise;
    //   })
    //   .then(playlists =>
    //     this.setState({
    //       playlists: playlists.map(item => {
    //         return {
    //           name: item.name,
    //           //imageUrl: item.images.url,
    //           songs: item.trackDatas.slice(0, 3)
    //         };
    //       })
    //     })
    //   );

// let playlistToRender =
    //   this.state.user && this.state.playlists
    //     ? this.state.playlists.filter(playlist => {
    //         let matchesPlaylist = playlist.name
    //           .toLowerCase()
    //           .includes(this.state.filterString.toLowerCase());
    //         let matchesSong = playlist.songs.find(song =>
    //           song.name
    //             .toLowerCase()
    //             .includes(this.state.filterString.toLowerCase())
    //         );
    //         return matchesPlaylist || matchesSong;
    //       })
    //     : [];