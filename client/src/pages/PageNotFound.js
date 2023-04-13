import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
    return (

        <Layout>
            <div className='pnf'>
                <h1 className='pnf-title'>Oops...</h1>
                <img className='pnf-image' src='brokenCamera.jpg' alt="a broken Camera!" />
                <h2>Page Not Found!</h2>
                <p>Maybe that link is broken. Sorry about that.</p>
                <Link to="/" className='pnf-btn'>Go Back Home</Link>
            </div>
        </Layout>
    );
};

export default PageNotFound