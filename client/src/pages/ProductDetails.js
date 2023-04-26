import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import axios from 'axios'


const ProductDetails = () => {

    // Define parameters to return for a product
    const params = useParams();

    const [product, setProduct] = useState({});


    // Default details
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])


    // Get the referenced product.

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-one-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Layout>

            <div className='row container mt-4'>

                <div className='col-md-6'>


                    <img src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="320"
                        width={'320px'}
                    />

                </div>


                <div className='col-md-6 '>
                    <h1 className='text-center'>The Details</h1>
                    <h4>Name: {product.name}</h4>
                    <h4>Description: {product.description}</h4>
                    <h4>Price: ${product.price}</h4>
                    <h4>Category: {product.category.name}</h4>
                    <button class="btn btn-outline-secondary ms-1">Add to Cart</button>

                </div>

            </div>
            <div className='row'> Simlar to this:</div>

            {/* <h1>More Details</h1>
            {/* Will return an array on the page of the data about a product selected from the homepage as an object, with the data stringified for use. 
            {JSON.stringify(product, null, 4)} */}


        </Layout>


    )
}

export default ProductDetails;