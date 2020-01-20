import React from "react";
import "./displayPlaylist.css";
import popularityNotes from './popularityNotes'

function msConvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function DisplayPlaylist({tracks}) {
    if (!tracks) {
      return <div>loading..</div>;
    } else if (tracks && tracks.length > 0){
      return (
        <div className="grid">
          <div className="row">
            <h3 className="track-details">Track name</h3>
            <h3 className="track-details">Artist</h3>
            <h3 className="track-details">Album</h3>
            <h3 className="small-col">Duration</h3>
            <h3 className="small-col">Popularity</h3>
          </div>
          {
            tracks.map((track, i) => {
              return (
                <div key = {`track ${i}`} className="row">
                  <div className="track-details">
                    {track.name}
                  </div>
                  <div className="track-details">
                    {(track.artist)}
                  </div>
                  <div className="track-details">
                    {track.album}
                  </div>
                  <div className="small-col">
                    {msConvert(track.duration_ms)}
                  </div>
                  <div className="small-col">
                    {popularityNotes(track.popularity)}
                  </div>
                </div>
              )
            })
          }</div>
      );
    }
}