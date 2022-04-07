import React from "react";

const SongsList = ({ song }) => {
  return (
    <>
      <div className="nextsong-details">
        <div className="nextsong-details-text">
          <img
            src={song.img_src}
            alt={song.title}
            style={{ width: "4em", height: "auto" }}
          />
          <b style={{ marginLeft: "10px" }}>{song.title} </b>&nbsp; by &nbsp;
          <b>{song.artist}</b>
        </div>
      </div>
    </>
  )
}

export default SongsList