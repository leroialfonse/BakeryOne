import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from 'antd/es/layout/layout';
import axios from 'axios';
import toast from 'react-hot-toast'


const Products = () => {

    const [product, setProduct] = useState([]);

    // Get all the products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api.v1/')

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while getting all the products.')
        }
    }
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                    <div className='col-md-9'>
                    </div>
                    <h1 className='text-center'>All Products</h1>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default Products;