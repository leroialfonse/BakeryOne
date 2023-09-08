import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'





const Search = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();






    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center mt-5'>

                    <h3 className='splash'>{values?.results.length < 1 ? <div className='pnf'>
                        <span className='pnf-title'>Oops...</span>
                        <img className='pnf-image m-2' alt="" />
                        <h2>We can't find that!</h2>
                        <p>Sorry about that. Why not look for something else?</p>
                        <Link to="/" className='pnf-btn'>Go Back Home</Link>
                    </div>

                        : `Found ${values?.results.length}`}</h3>

                    <div className='d-flex flex-wrap mt-5' style={{ justifyContent: 'center' }}>
                        {values?.results.map((p) => (

                            <div className="card m-2" style={{ width: '18rem' }}  >

                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    style={{ maxHeight: '18rem', padding: '.3rem', borderRadius: '12px' }}

                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text">${p.price}</p>
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
                </div>
            </div>

        </Layout>

    )
}

export default Search