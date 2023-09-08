import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'





const CategoryProducts = () => {


    const params = useParams();
    const navigate = useNavigate();


    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();



    useEffect(() => {
        if (params?.slug) getProductsByCategory()
    }, [params?.slug])

    const getProductsByCategory = async () => {

        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='container mt-3'>

                <h3 className='text-center splash2'>Looking for: {category?.name}</h3>
                <h3 className='text-center splash3'>{products?.length} {category?.name} found!</h3>
            </div>
            <div className='row'>
                <div className='d-flex flex-wrap m-3' style={{ justifyContent: 'center' }}>
                    {products?.map((p) => (

                        <div className="card m-2" style={{ width: '18rem' }} key={p._id}  >

                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                style={{ maxHeight: '18rem', padding: '.3rem', borderRadius: '12px' }}

                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 20)}...</p>
                                <p className="card-text">${p.price}</p>
                                {/* This will take you to a page that features the product with all it's information available */}
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button className="btn btn-outline-secondary ms-1" onClick={() => {
                                    setCart([...cart, p])
                                    toast.success('Added to your cart!')
                                }}>Add to Cart</button>

                            </div>
                        </div>

                    ))}
                </div>
                {/* <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                {loading ? 'Loading....' : 'Load More...'}
                            </button>
                        )}

                    </div> */}
            </div>
        </Layout>

    )
}

export default CategoryProducts;