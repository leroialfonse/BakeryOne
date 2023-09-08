import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'


const ProductDetails = () => {


    const navigate = useNavigate();

    // Define parameters to return for a product
    const params = useParams();

    const [product, setProduct] = useState({});

    const [related, setRelated] = useState([]);
    const [cart, setCart] = useCart();


    // Initial product details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])


    // Get the referenced product.

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-one-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    };

    // Show a few similar products.
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/similar-products/${pid}/${cid}`);
            setRelated(data?.products);
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <Layout>

            <div className='row container mt-4 '>

                <div className='col-md-6'>


                    <img src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top detail-image"
                        alt={product.name}
                        height='75%'
                    // Need to figure out better dimensions for sizing on this page...
                    // height="500px"
                    // width="300px"
                    />

                </div>

                <div className='col-md-6'>
                    <h1 className='text-center splash'>The Details</h1>
                    <h3 className='splash2'>{product.name}</h3>
                    <h5 className='text-center'>What to know: {product.description}</h5>
                    <div className='d-flex' style={{ justifyContent: 'space-evenly' }}>

                        <h4>Category: {product?.category?.name}</h4>
                        <h4 style={{ color: 'brightGreen' }}>Price: ${product.price}</h4>

                    </div>
                    <button className="btn btn-outline-secondary ms-1" onClick={() => {
                        setCart([...cart, product])
                        toast.success('Added to your cart!')
                    }}>Add to Cart</button>

                </div>

            </div>

            <hr />
            <div className='row m-6'>
                <h5 className='splash'>More like this:</h5>
                {/* Will create an array of  3 items similar to the featured item, based on similar categories. */}
                {related.length < 1 && (<p className="text-center">No similar options found.</p>)}




                <div className='d-flex flex-wrap'>
                    {related?.map((p) => (

                        <div className="card m-2" style={{ width: '18rem' }}  >

                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                style={{ maxHeight: '18rem', padding: '.3rem', borderRadius: '12px' }}

                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text" >{p.description.substring(0, 20)}...</p>
                                <p className="card-text">${p.price}</p>
                                {/* This will take you to a page that features the product with all it's information available */}

                                <button className="btn btn-outline-secondary ms-1" onClick={() => {
                                    setCart([...cart, p])
                                    toast.success('Added to your cart!')
                                }}>Add to Cart</button>
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>


                            </div>
                        </div>

                    ))}
                </div>
            </div>




        </Layout>


    )
}

export default ProductDetails;