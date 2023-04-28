import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'



const CartPage = () => {

    const navigate = useNavigate();


    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();


    // Delete an item from the cart.

    const deleteCartItem = async () => {



    }


    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                            <h4 className='text-center'>
                                {cart?.length > 1
                                    ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : `Please login to checkout...`} `
                                    : 'Your cart is Empty.'}
                            </h4>
                        </h1>
                    </div>
                </div>
                <div className='row '>
                    <div className='col-md-8'>
                        {cart?.map((p) => (
                            <div className='row mb-2 card flex-row p-3'>
                                <div className='col-md-4'>
                                    <img src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width='100px'
                                        height={'200px'}
                                    />
                                </div>
                                <div className='col-md-8'>
                                    <h5 style={{ fontWeight: 700 }} >{p.name}</h5>
                                    <p>{p.description.substring(0, 30)}...</p>
                                    <p>{p.price}</p>
                                    <button className='btn btn-danger' onClick={() => deleteCartItem(p._id)}>-</button>

                                </div>
                            </div>

                        ))}

                    </div>
                    <div className='col-md-4'>
                        Checkout | Payment
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage