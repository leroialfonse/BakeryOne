import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth();


    const navigate = useNavigate();

    // form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone)
        // toast.success('Registration Successful!')
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                // saves the auth object in local storage so you can stay logged in.
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate("/");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something didn\'t develop...')
        }
    };

    return (

        <Layout title={'Login - Back in Focus...'}>
            <div className='register'>
                <h1>Welcome Back</h1>
                <form onSubmit={handleSubmit}>



                    <div className="mb-3">

                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail"
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword"
                            placeholder='Password'
                            required />
                    </div>






                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login;