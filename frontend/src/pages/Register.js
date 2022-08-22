import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const body = {name: name, email: email, password: password};
        const response = await axios.post('http://localhost:5000/api/users', body);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate('/userdata');
    }

    return (
        <section className='header'>
            <h1>Register</h1>
            <p>Please create an account</p>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <input type="text" name="name" value={name} placeholder='Enter Your Name' className='form-control' onChange={onChange} />
                    <input type="email" name="email" value={email} placeholder='Enter Your Email' className='form-control' onChange={onChange} />
                    <input type="password" name="password" value={password} placeholder='Enter Your Password' className='form-control' onChange={onChange} />
                    <button className='btn btn-block' type="submit">Submit</button>
                </form>
            </section>
        </section>
    )
}

export default Register;