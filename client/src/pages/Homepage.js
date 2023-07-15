import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';



const Homepage = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    // State for the checkboxes for category filter
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useCart();



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
        getTotal();
    }, []);


    // Get all the products
    const getAllProducts = async () => {
        try {
            // Load more button
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            // Load more button 
            setLoading(false)

            // tells state where to get the {data} from.
            setProducts(data.products);

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };


    //  Get a total count of all the items to display on the page.
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count')
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    // Load more functions
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false);
            setProducts([...products, ...data?.products]);

        } catch (error) {

            console.log(error);
            setLoading(false);
        }
    };



    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    // Show everything!
    useEffect(() => {
        // set a condition to show products based on selected filters.
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProducts();
    }, [checked, radio]);


    // Show filtered products.
    const filterProducts = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio })
            setProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    };



    return (
        <Layout title={'Fresh From the Oven - Sweetie Pie Bakery'}>
            <div className='row mt-3'>

                <div className='col-md-2 p-5 sidebar mb-3' style={{ backgroundColor: '#f3d758', borderRadius: '5px', width: '20rem', marginLeft: '1.3rem' }} >
                    <h4 className='text-center' >Filter by Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                        ))}
                    </div>
                    {/* FIlters items by price. */}
                    <h4 className='text-center mt-4'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>

                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    {/* Basic window reload to clear the filters */}
                    <div className='d-flex flex-column mt-3' style={{ width: '10rem' }}>

                        <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>

                    </div>
                </div>
                <div className='col-md-9'>


                    {/* Turns the data in 'checked' into Json strigns, so that i can check the function of the check function. I'm gonna keep this here for now- useful for showing me that it's responding to calls for that data.*/}

                    {/* {(radio, null, 4)}; */}

                    <h1 className='text-center splash'>Fresh from the Oven!</h1>
                    <div className='d-flex flex-wrap m-3 text-center' style={{ justifySelf: 'center', alignSelf: 'center' }}>
                        {products?.map((p) => (

                            <div className="card m-2" style={{ width: '18rem' }}  >

                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    {/* This will take you to a page that features the product with all it's information available */}
                                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-outline-secondary ms-1" onClick={() => {
                                        setCart([...cart, p])
                                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                        toast.success('Added to your cart!')
                                    }}>Add to Cart</button>

                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                {loading ? 'Loading....' : 'Load More...'}
                            </button>
                        )}

                    </div>
                </div>

            </div>
        </Layout >
    );
};

export default Homepage;