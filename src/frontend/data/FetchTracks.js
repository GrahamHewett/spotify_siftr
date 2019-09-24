import React, { Component } from "react";
import "./getPlaylistTracks.css";
// import starPop from "./StarPop";

function msConvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default class FetchTracks extends Component {
  render() {
    if (this.props.tracks.length === 0) {
      return <div>loading..</div>;
    } else {
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
              this.props.tracks.map((track, i) => {
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
                    {/* <div className="starPoo">
                      The poularity is ...
                    </div> */}
                  </div>
                )
              })
            }</div>
        </div>
      );
    }
  }
}