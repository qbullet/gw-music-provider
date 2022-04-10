import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";
import MusicProvider from "./resources/MusicProvider";
import SocketIo from 'socket.io-client'

const MusicService = new MusicProvider()

const App = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const { data } = await MusicService.getMusics()

        setSongs(data)
      } catch (error) {
        console.error(error)
      }
    }
    

    fetchMusics()
  }, [])

  useEffect(() => {
    const ENDPOINT = process.env.REACT_APP_GW_MUSIC_PROVIDER_SOCKET
    const socket = SocketIo(ENDPOINT)

    socket.on('queue-updated', (queue) => {
      setSongs(queue)
    })
  }, [])

  return (
    <div className="App">
      {/* <div className="weirdShape"></div> */}
      <Player songs={songs} />
    </div>
  );
}

export default App;
