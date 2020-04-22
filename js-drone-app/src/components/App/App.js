import React, { useState, useEffect } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { Navbar, Video } from '../index'
import "@tensorflow/tfjs"
import "./App.sass"
import { handleKeyDown, handleKeyUp } from '../../logic/control'


export default function App() {

  const [model, setModel] = useState(null)

  useEffect(() => {
    (async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    })()
  }, [])

  return (

    <div className="app " onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)} tabIndex="-1">

      <Navbar />
      <Video model={model} />

    </div>

  )
}


