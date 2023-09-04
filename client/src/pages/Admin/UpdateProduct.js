// import React, use state, and useEffect. 
import React, { useState, useEffect } from 'react'
// Bring in the layout component for consisstent appearance..
import Layout from '../../components/Layout/Layout'
// Bring in admin menu
import AdminMenu from '../../components/Layout/AdminMenu'
// toast for error/success popups
import toast from 'react-hot-toast'
// axios for routing
import axios from 'axios'
// bring in select dropdown...
import { Select } from 'antd'
//import nav from React router dom
import { useNavigate, useParams } from 'react-router-dom'
// and options from antd.
const { Option } = Select







const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    // set state to affect product listing. 
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');




    // Get a single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-one-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setPhoto(data.product.photo);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);




    //get all categories.
    const getAllCategories = async (req, res) => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success)
                setCategories(data?.category);

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong when getting the categories.')
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // Update this product

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            photo && productData.append('photo', photo)
            productData.append('category', category)

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)

            if (data?.success) {
                toast.success('Product Updated!')
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)

            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while updating the product...')
        }
    };

    const handleDelete = async () => {
        try {
            // propmt to check if the user wants to delete 
            let answer = window.prompt('Are you sure you want to delete this product?');
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success('Product deleted!')
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.headers);
            toast.error('Could not delete the product.');
        }
    };



    return (
        <Layout title={'Update a Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <AdminMenu />
                    <div className='col-md-9'></div>
                </div>
                <h1>Update this Product</h1>
                <div className='m-1' >
                    <Select bordered={false} placeholder='Choose a category'
                        size='large'
                        showSearch
                        className='form-select mb-3' onChange={(value) => {
                            setCategory(value);
                        }}
                        value={category}

                    >{categories?.map(c =>
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    )}
                    </Select>

                    <div className='mb-3'>
                        <label className='btn btn-outline-secondary'>
                            {photo ? photo.name : "Upload a new Product Image"}
                            <input
                                type='file'
                                name='product image' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                            />
                        </label>
                    </div>

                    <div className='mb-3'>
                        {photo ? (
                            <div className='text-center'>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product"
                                    height={'200px'} className='img img-responsive' />
                            </div>
                        ) : (
                            <div className='text-center'>
                                <img
                                    src={`/api/v1/product/product-photo/${id}`}

                                    alt="product"
                                    height={'200px'} className='img img-responsive' />
                            </div>
                        )}
                    </div>

                    <div className='mb-3'>
                        <input type='text'
                            value={name}
                            placeholder='Image Title'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}

                        />
                    </div>

                    <div className='mb-3'>
                        <input type='text'
                            value={description}
                            placeholder='Product Description'
                            className='form-control'
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>

                    <div className='mb-3'>
                        <input type='text'
                            value={price}
                            placeholder='Listed Price'
                            className='form-control'
                            onChange={(e) => setPrice(e.target.value)}

                        />
                    </div>
                    <div className='mb-3'>
                        <input type='number'
                            value={quantity}
                            placeholder='In Stock Quantity'
                            className='form-control'
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <Select bordered={false} placeholder='Select Shipping Option'
                            size='large'
                            showSearch
                            className='form-select mb-3' onChange={(value) => { setShipping(value) }}
                            value={shipping ? 'Yes' : 'No'}
                        >
                            <Option value='0'>No</Option>
                            <Option value='1'>Yes</Option>
                        </Select>

                    </div>
                    <div className='mb-3' >
                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                    </div>
                    <div className='mb-3' >
                        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct;