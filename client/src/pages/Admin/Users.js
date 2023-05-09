import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'


const Users = () => {
    return (
        <Layout title={'All Users'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <AdminMenu />
                    <div className='col-md-9'></div>
                </div>
                <h1>
                    Users: (Will add the users list to this page later...)
                    {/* {Users?.map(u => <p>{userModel}</p>)} */}
                </h1>
            </div>
        </Layout>

    )
}

export default Users