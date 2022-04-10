/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import YouTube from "react-youtube";
import SongsList from "./SongsList";
import SocketIo from 'socket.io-client'

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
  
  const onYoutubeStateChange = (state) => {
    if (state.data === 0) {
      const ENDPOINT = process.env.REACT_APP_GW_MUSIC_PROVIDER_SOCKET
      const socket = SocketIo(ENDPOINT)
  
      socket.emit('end-music', props.songs[0].id)

      SkipSong(true)
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
    const currentIndex = props.songs.findIndex((song) => song.id === )
    const temp = props.songs.filter((song, index) => index !== 0)
    setQueue(temp)
  }, [props.songs]);

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        if (temp < props.songs.length - 1) {
          temp++;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        if (temp > 0) {
          temp--;
        }

        return temp;
      });
    }
  };

  return (
    <>
      <div className="music-player">
        <YouTube 
          ref={youtubePlayerRef}
          videoId={props.songs[props.currentSongIndex]?.src || null}
          opts={youtubeOptions}
          onStateChange={onYoutubeStateChange}/>
        <PlayerDetails song={props.songs[props.currentSongIndex]} />

        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
        />
      </div>

      <div className="text-anim">
        <strong>Upcoming Song:</strong>
      </div>
      <div className="songs-list" onClick={() => setShowQueue((val) => !val)}>
        { 
          queue?.length > 0 
          ? (
            showQueue
            ? (queue.map((song, index) => <SongsList song={song} key={`song-${index}`}/>))
            : (<SongsList song={queue[0]}/>)
          )
          :  (
            (<b>No more queue, Add some!!</b>)
          )
        }
      </div>
    </>
  );
}
export default Player;
