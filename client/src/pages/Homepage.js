import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Checkbox, } from 'antd';
import { toast } from 'react-hot-toast';




const Homepage = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Bring in all the categories so that we can sort items that way.

    // get all the categories
    const getAllCategories = async (req, res) => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success)
                setCategories(data.category);

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong when getting the categories.')
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);


    // Get all the products
    const getAllProuducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        getAllProuducts();
    }, [])

    return (
        <Layout title={'Frame your Story'}>
            <div className='row mt-3'>

                <div className='col-md-2'>
                    <h4 className='text-center'>Filter by Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => console.log(e)}>{c.name}</Checkbox>)
                        )}
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>Everything!</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (

                            <div className="card m-2" style={{ width: '18rem' }}  >

                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <button class="btn btn-primary ms-1">More Details</button>
                                    <button class="btn btn-outline-secondary ms-1">Add to Cart</button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;