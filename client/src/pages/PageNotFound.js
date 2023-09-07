import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
    return (

        <Layout title={'Go back - Page Not Found'}>
            <div className='pnf'>
                <span className='pnf-title'>Oops...</span>
                <img className='pnf-image m-2' alt='Page Not Found!' />
                <h2>Page Not Found!</h2>
                <p>Maybe that link is broken. Sorry about that.</p>
                <Link to="/" className='pnf-btn'>Go Back Home</Link>
            </div>
        </Layout>
    );
};

export default PageNotFound