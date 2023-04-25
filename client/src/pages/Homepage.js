import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { toast } from 'react-hot-toast';
import { Prices } from '../components/Prices';




const Homepage = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    // State for the checkboxes for category filter
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);


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
            // tells state where to get the {data} from.
            setProducts(data.products);
        } catch (error) {
            console.log(error)
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
        if (!checked.length || !radio.length) getAllProuducts();

    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProducts()
    }, [checked, radio]);




    // Show filtered products.
    const filterProducts = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio })
            setProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout title={'Frame your Story'}>
            <div className='row mt-3'>

                <div className='col-md-2'>
                    <h4 className='text-center'>Filter by Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>)
                        )}
                    </div>
                    {/* FIlters items by price. */}
                    <h4 className='text-center mt-4'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group>
                            {Prices?.map(p => (
                                <div key={p._id}>

                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className='col-md-9'>


                    {/* Turns the data in 'checked' into Json strigns, so that i can check the function of the check function. */}

                    {JSON.stringify(radio, null, 4)};

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
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text">${p.price}</p>
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