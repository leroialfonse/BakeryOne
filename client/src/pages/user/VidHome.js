import React, { useState } from 'react';
// import video from '../assets/bakeryVid.mp4';
import video from '../user/bakeryVid.H264';


import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'



const VidHome = () => {

    // const [auth, setAuth] = useAuth([]);
    // const user = useAuth();

    const [isActive, setIsActive] = useState(false);


    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <section onClick={handleToggle} className={`showcase ${isActive ? 'active' : ''}`}>
                <header>
                    <h2 className='logo'>Always Fresh</h2>
                    {/* <Link to="/Home" className=" logo">🧁</Link> */}
                    <div className={`toggle ${isActive ? 'active' : ''}`}></div>
                </header>
                {/* */}
                {/* <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url='bakeryVid.mp4'
                        width='100%'
                        height='100%'

                    />

                </div> */}
                {/*  */}

                <video
                    className="vidBg" src={video} autoPlay muted loop></video>

                <div className='overlay'></div>
                <div className='text'>
                    <h2>Sweetie Pie!</h2>
                    <h3>Welcome to the Kitchen!!</h3>
                    <p>
                        All of your favorite sweet treats, baked fresh every day! Run, don't walk to Sweetie Pie's bakery!

                    </p>
                    <Link to='/Home'>Hungry??</Link>
                </div>

                {/* <ul className='social'>
                    <li><img src='facebook.png' alt='' /></li> <li><img src='twitter.png' alt='' /></li> <li><img src='instagram.png' alt='' /></li>
                </ul> */}
            </section>
            <div className='menu'>

                <ul>
                    {/* <li>                                <NavLink to="/Home" className="nav-link" >Home</NavLink>
                    </li> */}

                    <li><Link to='/categories'>All Treats</Link></li>
                    <li><Link to='/Home'>Choose a Snack!</Link></li>
                    <li><Link to='/cart'>Cart</Link></li>
                </ul>
            </div >
        </>











    )
}

export default VidHome;