import React from "react";

const PlayerDetails = (props) => {
  return (
    <div className="music-player--details">
      <div className="details-img">
        <img
          className="details-img--image"
          src={props.song?.imgSrc || ''}
          alt={props.song?.title || ''}
        />
      </div>
      <div className="artist-info">
        <h3 className="details-title">{props.song?.title || ''}</h3>
        <h4 className="details-artist">{props.song?.artist || ''}</h4>
        <div className="line"></div>
      </div>
    </div>
  );
}

export default PlayerDetails;
