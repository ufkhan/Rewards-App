import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <header className='top-header'>
            <Link className='links' to="/">Home</Link>
            <Link className='links' to="/login">Login</Link>
            <Link className='links' to="/register">Register</Link>
        </header>
    )
}

export default Dashboard;