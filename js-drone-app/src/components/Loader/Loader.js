import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Loader.sass'


const Loader = ({ text }) => {

    return <>

        <div className="wrap">

            <h2 className="loading-title">{text}</h2>
            <FontAwesomeIcon className="mt gray" icon={faSpinner} spin size="3x" />

        </div>

    </>
}

export default Loader
