import React from "react";
import drone from './drone.svg'
import "./Navbar.sass"


const Navbar = () => {

    return <>
        <nav className="navbar">
            <li className="navbar__item">
                <img src={drone} className="lnav-logo_link" alt="logo" />
            </li>
            <li className="navbar__item center">
                <p className="title">Real-Time Drone Object Detection</p>
            </li>
            <li className="navbar__item right"></li>
        </nav>
    </>
}

export default Navbar