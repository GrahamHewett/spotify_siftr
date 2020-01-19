import React from "react";
import "./fetchTracks.css";
import popularityNotes from './popularityNotes'
function msConvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function FetchTracks({tracks}) {
    if (tracks && tracks.length === 0) {
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
                      {track[0]}
                    </div>
                    <div className="trackName">
                      {(track[1])}
                    </div>
                    <div className="trackName">
                      {track[2]}
                    </div>
                    <div className="trackName">
                      {msConvert(track[3])}
                    </div>
                    <div className="starPoo">
                      The poularity is {track[4]}
                    </div>
                  </div>
                )
              })
            }</div>
        </div>
      );
    }
}