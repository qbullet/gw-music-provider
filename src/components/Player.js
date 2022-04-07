/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import YouTube from "react-youtube";
import SongsList from "./SongsList";

const Player = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [queue, setQueue] = useState([]);

  const youtubePlayerRef = useRef(null);

  const youtubeOptions = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  }

  const onYoutubeReady = () => {
    if (youtubePlayerRef.current) {
      const youtubePlayer = youtubePlayerRef.current.getInternalPlayer()

      if (isPlaying) {
        youtubePlayer.playVideo()
      }

      if (!isPlaying) {
        youtubePlayer.pauseVideo()
      }
    }
  }

  useEffect(() => {
    if (youtubePlayerRef.current) {
      const youtubePlayer = youtubePlayerRef.current.getInternalPlayer()

      if (isPlaying) {
        youtubePlayer.playVideo()
      }

      if (!isPlaying) {
        youtubePlayer.pauseVideo()
      }
    }
  });

  useEffect(() => {
    const temp = props.songs.filter((song, index) => index !== props.currentSongIndex)
    setQueue(temp)
  }, [props.currentSongIndex, props.songs]);

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <>
      <div className="text-anim">
        <strong>Upcoming Song:</strong>
      </div>
      <div className="songs-list" onClick={() => setShowQueue((val) => !val)}>
        { 
          queue?.length > 0 
          ? (
            showQueue
            ? (queue.map((song, index) => <SongsList song={song} key={`song-${index}`}/>))
            : (<SongsList song={props.songs[props.nextSongIndex]}/>)
          )
          :  (
            (<b>No more queue, Add some!!</b>)
          )
        }
      </div>
      
      <div className="music-player">
        <YouTube 
          ref={youtubePlayerRef}
          videoId={props.songs[props.currentSongIndex].src}
          opts={youtubeOptions}
          onReady={onYoutubeReady} />
        <PlayerDetails song={props.songs[props.currentSongIndex]} />

        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
        />
      </div>
    </>
  );
}
export default Player;
