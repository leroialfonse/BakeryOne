import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    // Creating a countdown before an unauthorized user is re-directed.
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        // Counter reaches 0, redirect.
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        })
        // reset counter after page left.
        return () => clearInterval(interval);
    }, [count, navigate, location, path])
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh", color: "red" }}>
                <h3 className='text-center'>Redirecting you in {count}...</h3>

                <div className="spinner-border" role="status">

                    {/* <span className="visually-hidden">Loading...</span> */}
                </div>

            </div>


        </>
    )
}

export default Spinner;