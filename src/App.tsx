import { useEffect, useState } from 'react'
import { BsPlayFill } from 'react-icons/bs/';
import { GrPauseFill } from 'react-icons/gr'
import { IconContext } from "react-icons";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [PlayerSpotify, setPlayerSpotify] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token =
        "BQC7aj8j2BOVspDDhuprCBvT1YBQb7pG8AbCl1P5mpqjqyNph0zjatWljaXar-e5Fo4hcv6Psu2YaHmzgnB-YO218YZ7EwMUocrfTposVuReuP2O3CXwMlPOlJMqp6ngYE3MD4oFCg7oOFkRBf2m0vwIOZNN6_VS0VFlSWfkd21UgvpdkYntY1XXvXA_cMtYra9FM01GGv9c4SGYo3XT0aWZ5809";
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      setPlayerSpotify(player)
      player.connect();
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });
    };
  }, [])
  

  function play() {
    if (isPlaying) {
      setIsPlaying(false)
    }
    else {
      setIsPlaying(true)
    }
    console.log("play");
    PlayerSpotify.togglePlay();
  }

  return (
    <>
      <div>
        <button onClick={play}>

          {isPlaying ? <IconContext.Provider value={{ color: "white"}}><GrPauseFill /></IconContext.Provider> : <BsPlayFill />}

        </button>
        </div>
    </>
  )
}

export default App
