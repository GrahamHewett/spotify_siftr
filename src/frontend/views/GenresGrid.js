import React from "react";
import Genres from "./Genres";
import "./genres-grid.css";

const GenresGrid = props => {
  return (
    <div className="section-genresGrid">
      <h1> Looking for music ? </h1>
      <div className="genre-container">
        {Genres.map((genre, i) => {
          return (
            <div
              key={i}
              className={[
                'genre-item',
                genre.playlistId === props.selectedGenre ? 'is-selected' : ''
              ].join(' ')}
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
