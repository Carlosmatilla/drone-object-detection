import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Buttons.sass'


const Buttons = ({ handleStartDrone, handleLoading, loading }) => {

    return <>
        <div className="wrap bounce-animation">

            <h2 className="loading-title">{!loading ? `Connect to Drone` : `Seeking wifi endpoints...`}</h2>

            <button className={!loading ? "button mt" : "button mt btn-radius"} onClick={() => {
                handleStartDrone()
                handleLoading()
            }}>{!loading ?
                `Connect` :
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />}
            </button>

        </div>

    </>
}

export default Buttons