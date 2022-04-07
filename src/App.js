import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";

const App = () => {
  const [songs] = useState([
    {
      title: "$orries",
      artist: "Peachy!",
      album: " Shiloh",
      track: "$orries",
      year: "1",
      img_src: "./songs_images/$orries_Cover (front)_e.jpg",
      src: "92fK3K8nagk",
    },
    {
      title: "[oops]",
      artist: "potsu",
      album: "[oops]",
      track: "1",
      year: "",
      img_src: "./songs_images/[oops]_Cover (front)_e.jpg",
      src: "z9LiPuVRyU8",
    },
    {
      title: "5:32pm",
      artist: "The Deli",
      album: "Vibes 2",
      track: "12",
      year: "",
      img_src: "./songs_images/5 32pm_Cover (front)_e.jpg",
      src: "5udeKRQFt80",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex]);

  return (
    <div className="App">
      {/* <div className="weirdShape"></div> */}
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );
}

export default App;
