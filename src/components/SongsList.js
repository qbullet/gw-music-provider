import React from "react";

const SongsList = ({ song }) => {
  return (
    <>
      <div className="nextsong-details">
        <div className="nextsong-details-text">
          <img
            src={song.imgSrc}
            alt={song.title}
            style={{ width: "4em", height: "auto", maxHeight: "4em" }}
          />
          <b style={{ marginLeft: "10px" }}>{song.title} </b>&nbsp; by &nbsp;
          <b>{song.artist}</b>
        </div>
      </div>
    </>
  )
}

export default SongsList