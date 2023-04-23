import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'



const Homepage = () => {
    const [auth, setAuth] = useAuth()
    return (
        <Layout title={'Frame your Story'}>
            <div className='row'>
                <div className='col-md-3'>
                    <h1 className='text-center'>

                    </h1>
                    <div className='col-md-9'>
                        <h1 className='text-center'>Everything!</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;