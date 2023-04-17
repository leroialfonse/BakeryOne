import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'



const Dashboard = () => {

    const [auth] = useAuth();
    return (
        <Layout title={'SnapShot! - Light and Shadow'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h2>Your Profile</h2>
                            <h5> Name:  {auth?.user?.name}</h5>
                            <h5> Email: {auth?.user?.email}</h5>
                            <h5> Address: {auth?.user?.address}</h5>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard