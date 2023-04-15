import Layout from '../../components/Layout/Layout'
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();


    // form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone)
        // toast.success('Registration Successful!')
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something didn\'t develop...')
        }
    };

    return (
        <Layout title={'Forgot Password - Light And Shadow'}>
            <div className='register'>
                <h4>Reset your Password</h4>
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

                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail"
                            placeholder='What is your favorite food?'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword"
                            placeholder='Password'
                            required />
                    </div>





                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword