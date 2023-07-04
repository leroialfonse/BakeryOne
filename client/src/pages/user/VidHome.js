// import axios from "axios";
import React, { useState } from 'react';
// import { Player } from 'video-react';
import video from '../../assets/bakeryVid.mp4'
import { NavLink, Link } from 'react-router-dom';

// import { NavLink, Link } from 'react-router-dom'
// import { useAuth } from '../../context/auth'
// import toast from "react-hot-toast"
// import SearchForm from '../Form/SearchForm'
// import useCategory from '../../hooks/useCategory'
// import { useCart } from '../../context/cart'
// import { Badge } from 'antd'


// const menuToggle = document.

// const [auth, setAuth] = useAuth();
// const [cart] = useCart();
// const categories = useCategory();


const VidHome = () => {

    const [isActive, setIsActive] = useState(false);


    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <section onClick={handleToggle} className={`showcase ${isActive ? 'active' : ''}`}>
            <header>
                <h2 className='logo'>Just like Momma's!</h2>
                {/* <Link to="/Home" className=" logo">🧁</Link> */}
                <div className={`toggle ${isActive ? 'active' : ''}`}></div>
            </header>

            <video
                className="vidBg" src={video} autoPlay muted loop />

            <div className='overlay'></div>
            <div className='text'>
                <h2>Sweetie Pie!</h2>
                <h3>welcome to the kitchen!!</h3>
                <p>
                    The standard Lorem Ipsum passage, used since the 1500s
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur

                </p>
                <Link to='/cart'>Hungry??</Link>
            </div>

            <ul className='social'>
                <li><img src='facebook.png' alt='' /></li> <li><img src='twitter.png' alt='' /></li> <li><img src='instagram.png' alt='' /></li>
            </ul>

            <div className='menu'>

                <ul>
                    {/* <li>                                <NavLink to="/Home" className="nav-link" >Home</NavLink>
                    </li> */}
                    <li><a href=''></a></li>
                    <li><a href=''></a></li>
                    <li><a href=''></a></li>
                </ul>
            </div>









        </section>

    )
}

export default VidHome;