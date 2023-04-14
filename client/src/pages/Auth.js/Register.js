import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // form submit 
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, email, password, address, phone)
    };

    return (
        <Layout title={'SignUp - Light and Shadow'}>
            <div className='register'>
                <h1>Sign up today!</h1>
                <p>Get started by signing up.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control" id="exampleInputEmail1"
                            placeholder='Name'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1"
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputEmail1"
                            placeholder='Password'
                            required />
                    </div>

                    <div className="mb-3">

                        <input type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1"
                            placeholder='Phone'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputEmail1"
                            placeholder='Address'
                            required
                        />
                    </div>


                    {/*
                    <div className="mb-3">
                        <label htmlFor="exampleInputRole" className="form-label">Role</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div> */}

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register;
