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
// and options from antd.
const { Option } = Select


const CreateProduct = () => {
    // set state to affect product listing. 
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');

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

    return (
        <Layout title={'Create a Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <AdminMenu />
                    <div className='col-md-9'></div>
                </div>
                <h1>Create a new product</h1>
                <div className='m-1' >
                    <Select bordered={false} placeholder='Choose a category'
                        size='large'
                        showSearch
                        className='form-select mb-3' onChange={(value) => { setCategory(value) }}>{categories?.map(c =>
                            <Option key={c._id} value={c.name}></Option>
                        )}
                    </Select>

                    <div className='mb-3'>
                        <label className='btn btn-outline-secondary '>
                            {photo ? photo.name : "Upload product Image"}
                            <input
                                type='file'
                                name='product image' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden
                            />
                        </label>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct