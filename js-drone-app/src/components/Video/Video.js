import React, { useState, createRef } from "react"
import JMuxer from "jmuxer"
import { socketIo } from '../../socket-io'
import { startDrone } from "../../logic/startDrone"
import { useToasts } from "react-toast-notifications"
import { Loader, Buttons} from '../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import "./Video.sass"

const videoRef = createRef()
const canvasRef = createRef()

const Video = ({ model }) => {

    const [loading, setLoading] = useState(false)
    const { addToast, toastStack } = useToasts()
    const [status, setStatus] = useState(" - ")

    const handleStartDrone = async () => {
        try {
            await startDrone()
            const jmuxer = new JMuxer({ node: "player", mode: "video", flushingTime: 1, fps: 30 })
            const ws = new WebSocket(`ws://localhost:2212`)
            ws.binaryType = "arraybuffer"
            ws.addEventListener("message", function (event) {
                jmuxer.feed({ video: new Uint8Array(event.data) })})
            window.stream = jmuxer.node
            videoRef.current = jmuxer.node
            socketIo.on("dronestate", (data) => {
                if (data !== undefined) setStatus(data)
            })
            socketIo.on("notification", (data) => {
                if (toastStack.length === 0) {
                    addToast(data, {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
            })
        } catch (error) {
            addToast("Couldn't connect to drone", {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    function handleStopDrone() {
        try {
            socketIo.emit("stop")
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    function handleLoading() {
        setLoading(true)
    }

    const detectFromVideoFrame = async video => {
        try {
            const predictions = await model.detect(video)
            showDetections(video, predictions)
            requestAnimationFrame(() => {
                detectFromVideoFrame(video)
            })
        } catch (error) {
            addToast("Couldn't start the video", {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    const showDetections = (video, predictions) => {
        const ctx = canvasRef.current.getContext("2d")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(video, 0, 0)
        const font = "16px Montserrat"
        ctx.font = font
        ctx.textBaseline = "top"
        predictions.forEach(prediction => {
            const x = prediction.bbox[0]
            const y = prediction.bbox[1]
            const width = prediction.bbox[2]
            const height = prediction.bbox[3]
            ctx.strokeStyle = "#00FFFF"
            ctx.lineWidth = 4
            ctx.strokeRect(x, y, width, height)
            ctx.fillStyle = "#00FFFF"
            const textWidth = ctx.measureText(prediction.class).width
            const textHeight = parseInt(font, 10)
            ctx.fillRect(x, y, textWidth + 4, textHeight + 4)
        })

        predictions.forEach(prediction => {
            const x = prediction.bbox[0]
            const y = prediction.bbox[1]
            ctx.fillStyle = "#000000"
            ctx.fillText(prediction.class, x, y)
        })
    }

    return <div className="video-container">

        <video onLoadedData={() => detectFromVideoFrame(videoRef.current)} width="1" height="1" className="video" id="player" playsInline autoPlay muted ref={videoRef} />
        {videoRef.current && <canvas ref={canvasRef} width={960} height={720} />}

        <div className="button-container">
            {model === null && <Loader text="Loading models..." />}
            {model !== null && status === " - " && <Buttons handleLoading={handleLoading} handleStartDrone={handleStartDrone} loading={loading} />}
        </div>

        <div className="pwroff-container">
            <FontAwesomeIcon className="power-off" icon={faPowerOff} onClick={handleStopDrone} size="1x" />
        </div>

    </div>
}

export default Video



