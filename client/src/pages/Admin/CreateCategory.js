import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd';



const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false);


  //form handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name });
      if (data?.success) {
        toast.success(`${name} has been created!`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with submitting the form...');
    }

  }
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
  }, [])
  return (

    <Layout title={'Dashboard - Create a Category'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />

          </div>
          <div className='col-md-9'>

            <h1>Manage Categories:</h1>
            <div className='p-3 w-50'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map through the categories and put them into a table on the page. */}
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className='btn btn-primary ms-2' onClick={() => setVisible(true)}>Edit</button>
                          <button className='btn btn-danger ms-2' >Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visisble={visible} >

            </Modal>
          </div>

        </div>
      </div>
    </Layout>

  );
};

export default CreateCategory