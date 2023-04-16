import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'


const CreateCategory = () => {
  return (
    <>
      <Layout title={'Create a Category'}>
        <div className='container-fluid m-3 p-3'>        <div className='row'>
          <div className='col-md-3'></div>
          <AdminMenu />
          <div className='col-md-9'></div>
        </div>
          <h1>Create a new Category:</h1>
        </div>
      </Layout>
    </>
  )
}

export default CreateCategory