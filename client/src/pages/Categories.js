import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'


const Categories = () => {

    const categories = useCategory()
    return (
        <Layout title={'All Categories'}>
            <div className='container'>
                <div className='row d-flex flex-wrap column p-3' >
                    {categories.map(c => (
                        <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' style={{ width: '20rem' }} key={c._id}>
                            <Link to={`/category/${c.slug}`} className='btn btn-warning'>{c.name}</Link>
                        </div>
                    ))}

                    {/*  */}


                    {/*  */}

                </div>
            </div>
        </Layout>


    )
}

export default Categories;