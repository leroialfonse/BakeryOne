import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    // The function to submit the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer, });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");

            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something didn\'t develop...')
        }
    };

    return (
        <Layout title={'SignUp - Sweetie Pie'}>
            <div className='register'>
                <h1>Sign up today!</h1>
                <p>Get started by signing up.</p>
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
                        />
                    </div>

                    <div className="mb-3">

                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword"
                            placeholder='Password'
                            required />
                    </div>

                    <div className="mb-3">

                        <input type="tel"
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

                    <div className="mb-3">

                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer"
                            placeholder='What is your favorite food?'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary buttons">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register;
