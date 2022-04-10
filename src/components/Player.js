/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import YouTube from "react-youtube";
import SongsList from "./SongsList";
import SocketIo from 'socket.io-client'

const Player = ({ songs, currentSong, setCurrentSong }) => {
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
      const SOCKET = SocketIo(ENDPOINT)
  
      SOCKET.emit('end-music', currentSong.id)

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
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id)
    const temp = songs.filter((song, index) => index > currentIndex)
    setQueue(temp)
  }, [songs, currentSong]);

  const SkipSong = (forwards = true) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (forwards && currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
    } 
    
    if (!forwards && currentIndex > 0) {
      setCurrentSong(songs[currentIndex - 1]);
    }
  };

  return (
    <>
      <div className="music-player">
        {
          currentSong?.src ? (
            <YouTube
              ref={youtubePlayerRef}
              videoId={currentSong.src}
              opts={youtubeOptions}
              onStateChange={onYoutubeStateChange}/>
          ) : (
            <></>
          )
        }
        <PlayerDetails song={currentSong} />

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
