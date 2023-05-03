import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
// Connect to braintree payment gateway pagckage.
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast'


const CartPage = () => {

    const navigate = useNavigate();


    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState('');
    // Braintree
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);




    // Total price of cart
    const total = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Delete an item from the cart.

    const deleteCartItem = async (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }



    };

    // Get  the payment gateway token....
    const getPaymentToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getPaymentToken();

    }, [auth?.token]);

    // Buy now button
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Successful!')
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };


    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                            <h4 className='text-center'>
                                {cart?.length
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
                                    <p>$ {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => deleteCartItem(p._id)}>Remove</button>

                                </div>
                            </div>

                        ))}

                    </div>
                    <div className='col-md-4'>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {total()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Your Location: </h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update your Address</button>
                                </div>

                            </>
                        ) : (
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update your address</button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                            state: '/cart'
                                        })}>Please Login to checkout. </button>
                                    )
                                }

                            </div>


                        )}

                        <div className='mt-2'>
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>

                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault',
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button className='btn btn-danger' onClick={handlePayment} disabled={!loading || !instance || !auth?.user?.address}>{loading ? "Processing" : "Pay Now"}</button>

                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;     