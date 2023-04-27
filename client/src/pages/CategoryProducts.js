import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';




const CategoryProducts = () => {

    const params = useParams();


    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);


    const getProductsByCategory = async () => {


        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='container mt-3'>
                <h1 className='text-center'>{category?.name}</h1>
            </div>
        </Layout>

    )
}

export default CategoryProducts;