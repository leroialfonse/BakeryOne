import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
// import { Modal } from 'antd';
import { Modal } from 'antd';



const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  // const [openModal, setOpenModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('')


  // const showModal = () => {
  //   setOpenModal(true)
  // };
  // const handleOk = () => {
  //   setOpenModal(false);
  // };
  // const handleCancel = () => {
  //   setOpenModal(false);
  // };
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
  }, []);


  // Update cateegory
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
      if (data.success) {
        toast.success(`Category '${updatedName}' has been updated!`)
        setSelected(null);
        setUpdatedName('');
        setOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message)
      }
    } catch (error) {

      toast.error('Somthing went wrong while updating.')
    }
  }

  // Delete a category.
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`,);
      if (data.success) {
        toast.success(`Category has been deleted!`);

        getAllCategories();
      } else {
        toast.error(data.message)
      }
    } catch (error) {

      toast.error('Somthing went wrong while deleteing.')
    }
  }

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
                          <button className='btn btn-primary ms-2' onClick={() => {
                            setOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}>Edit</button>
                          <button className='btn btn-danger ms-2' onClick={() => {
                            handleDelete(c._id)
                          }}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <Modal title="Create a Category" open={openModal} onOk={handleOk} onCancel={handleCancel} footer={null} visisble={openModal} > <p>Her we go</p>
            </Modal> */}
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />

            </Modal>

          </div>
        </div>

      </div>

    </Layout>

  );
};

export default CreateCategory