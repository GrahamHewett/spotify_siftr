import React from "react";
import "./genres-grid.css";

const genres = [
  { id: "rock", playlistId: "2ihY1sy2Eask1kLJME0UhG" },
  { id: "hiphop", playlistId: "4VHnyY41iIRJa5ykDj3gzU" },
  { id: "blues", playlistId: "37i9dQZF1DXeaMD6NdSui3" },
  { id: "jazz", playlistId: "79eC7PKQmhSsneKE5PpwtM" },
  { id: "pop", playlistId: "37i9dQZF1DXcZDD7cfEKhW" },
  { id: "classical", playlistId: "1kGtBpJnR0bPWX4JXi5wUo" },
];

const GenresGrid = props => {  
  return (
    <div className="section-genresGrid">
      <h1>Looking for music?</h1>
      <div className="genre-container">
        {genres.map((genre) => {
          return (
            <div key={genre.id} id={genre.id} className='genre-item'
              onClick={() => props.onClick(genre.playlistId)}>
              <a href='#playlist-tracks'><img src={require(`./images/${genre.id}.jpg`)} alt="genre" /></a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenresGrid;
