import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { Link } from 'react-router-dom'



const Search = () => {

    const [values, setValues] = useSearch();




    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center mt-5'>

                    <h6>{values?.results.length < 1 ? <div className='pnf'>
                        <span className='pnf-title'>Oops...</span>
                        <img className='pnf-image m-2' alt="Couldn't find that!" />
                        <h2>We can't find that!</h2>
                        <p>Sorry about that. Why not look for something else?</p>
                        <Link to="/" className='pnf-btn'>Go Back Home</Link>
                    </div>

                        : `Found ${values?.results.length}`}</h6>

                    <div className='d-flex flex-wrap mt-5'>
                        {values?.results.map((p) => (

                            <div className="card m-2" style={{ width: '18rem' }}  >

                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    <button className="btn btn-primary ms-1">More Details</button>
                                    <button className="btn btn-outline-secondary ms-1">Add to Cart</button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default Search