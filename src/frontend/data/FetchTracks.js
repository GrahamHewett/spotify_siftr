import React from "react";
import "./fetchTracks.css";
import popularityNotes from './popularityNotes'
function msConvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function FetchTracks({tracks}) {
    if (!tracks) {
      return <div>loading..</div>;
    } else if (tracks && tracks.length > 0){
      return (
        <div className="grandad">
          <div className="bigBoy">
            <div className="parent">
              <div className="title">Track name</div>
              <div className="title">Artist</div>
              <div className="title">Album</div>
              <div className="title">Track Length</div>
              <div className="title">Popularity</div>
            </div>
            {
              tracks.map((track, i) => {
                return (
                  <div key = {`track ${i}`} className="trackDeets">
                    <div className="trackName">
                      {track.name}
                    </div>
                    <div className="trackName">
                      {(track.artist)}
                    </div>
                    <div className="trackName">
                      {track.album}
                    </div>
                    <div className="trackName">
                      {msConvert(track.duration_ms)}
                    </div>
                    <div className="starPoo">
                      {popularityNotes(track.popularity)}
                    </div>
                  </div>
                )
              })
            }</div>
        </div>
      );
    }
}