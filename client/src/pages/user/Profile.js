import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {

    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Get the user's data...

    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])


    // The function to submit the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', { name, email, password, phone, address, });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let local = localStorage.getItem('auth')
                local = JSON.parse(local)
                local.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(local))
                toast.success('Profile Updated!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something didn\'t develop...')
        }
    };


    return (
        <Layout title={'Your Profile'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Your Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">

                                <input type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control" id="exampleInputName"
                                    placeholder='Name'
                                    required
                                />
                            </div>

                            <div className="mb-3">

                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail"
                                    placeholder='Email'
                                    required
                                    disabled
                                />
                            </div>

                            <div className="mb-3">

                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword"
                                    placeholder='Password'
                                />
                                <small>Enter your original password if you do not wish to change it now.</small>    </div>


                            <div className="mb-3">

                                <input type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone"
                                    placeholder='Phone'
                                    required
                                />
                            </div>

                            <div className="mb-3">

                                <input type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress"
                                    placeholder='Address'
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary buttons">Update your Profile</button>
                        </form>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;