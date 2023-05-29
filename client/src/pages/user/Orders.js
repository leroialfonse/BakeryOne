import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth';
import moment from 'moment'


const Orders = () => {

    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);


    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data)

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    return (
        <Layout title={'Your Order History'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Orders</h1>
                        {
                            orders?.map((order, i) => {
                                return (
                                    <div className='border shadow'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <td scope="col">#</td>
                                                    <td scope="col">Status</td>
                                                    <td scope="col">Buyer</td>
                                                    <td scope="col">Ordered</td>
                                                    <td scope="col">Payment</td>
                                                    <td scope="col">Quantity</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>{i + 1}</th>
                                                    <th>{order?.status}</th>
                                                    <th>{order?.buyer.name}</th>
                                                    <th>{moment(order?.createdAt).fromNow()}</th>
                                                    <th>{order?.payment.success ? "Successful" : "Failed"}</th>
                                                    <th>{order?.products?.length}</th>
                                                </tr>
                                                <div className='container'>
                                                    {order?.products?.map((p) => (
                                                        <div className='row mb-2 card flex-row p-3'>
                                                            <div className='col-md-4'>
                                                                <img src={`api/v1/product/product-photo/${p._id}`}
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
                                                                {/* <button className='btn btn-danger' onClick={() => deleteCartItem(p._id)}>Remove</button> */}

                                                            </div>
                                                        </div>

                                                    ))}

                                                </div>
                                            </tbody>
                                        </table>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders;