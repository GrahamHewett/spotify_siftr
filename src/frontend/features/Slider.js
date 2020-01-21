import React from "react";
import "./slider.css"

function Slider({sliderLimit}) {
  return (
    <div className="slidecontainer">
      <input type="range" min="10" max="50" className= "slider" id="myRange" 
          value={limit} onChange={(e) => setLimit(e.target.value)}>
      </input>
      <div>Number of Tracks shown: {limit}</div>
    </div>
  );
}
export default Slider;

// const TrackListCount = (e) => {
//     const slider = document.getElementById("slider")
//     return slider ? setLimit(slider.value) : null
//     // return slider.value;
//   }

{/* <div className="slider-container-box sl">
        <input id="slider" type="range" min="10" max="50" 
          defaultValue="10" step="1" onChange={() => TrackListCount()}
        />
      <div> Number of Tracks shown: {limit}</div>
      </div> */}