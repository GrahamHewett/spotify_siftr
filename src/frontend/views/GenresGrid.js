import React from "react";
import "./genres-grid.css";

const genres = [
  { id: "rock", genre: "Rock", playlistId: "2ihY1sy2Eask1kLJME0UhG" },
  { id: "pop", genre: "Pop", playlistId: "37i9dQZF1DXcZDD7cfEKhW" },
  { id: "hiphop", genre: "Hip-Hop", playlistId: "4VHnyY41iIRJa5ykDj3gzU" },
  { id: "jazz", genre: "Jazz", playlistId: "79eC7PKQmhSsneKE5PpwtM" },
  { id: "classical", genre: "Classical", playlistId: "1kGtBpJnR0bPWX4JXi5wUo" },
  { id: "blues", genre: "Blues", playlistId: "37i9dQZF1DXeaMD6NdSui3" }
];

const GenresGrid = props => {
  return (
    <div className="section-genresGrid">
      <h1> Looking for music ? </h1>
      <div className="genre-container">
        {genres.map((genre, i) => {
          return (
            <div key={i} className='genre-item'
              onClick={() => props.onClick(genre.playlistId)}
            >
              <img src={require(`./images/${genre.id}.jpg`)} alt="genre" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenresGrid;
