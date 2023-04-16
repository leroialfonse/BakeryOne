import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'



const CreateProduct = () => {
    return (
        <>      <Layout title={'Create a Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <AdminMenu />
                    <div className='col-md-9'></div>
                </div>
                <h1>Create a new product</h1>
            </div>
        </Layout>
        </>
    )
}

export default CreateProduct