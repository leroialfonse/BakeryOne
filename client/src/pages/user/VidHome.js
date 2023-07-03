// import axios from "axios";
import React from 'react';
// import { Player } from 'video-react';
import video from '../../assets/bakeryVid.mp4'

const VidHome = () => {
    return (
        <div className='main'>
            <section className="showcase">
                <header>
                    <h2>Sweetie Pie!</h2>
                    <div className="toggle"></div>
                </header>

                <video



                    className="vidBg" src={video} autoPlay muted loop />


            </section>

        </div>
    )
}

export default VidHome;