import React from 'react'
import AdminDashboard from './AdminDashboard'




const AdminOrders = () => {
    return (
        <div className='row'>
            <div className='col-md-3'>
                <AdminDashboard />
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Orders</h1>
            </div>
        </div>
    )
}

export default AdminOrders