import React, { useState } from 'react';
import axios from 'axios';

const AddNewData = ({ setData }) => {
    const [amount, setAmount] = useState('');

    function onChange(e) {
        setAmount(e.target.value);
    }

    function onSubmit() {
        let token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = { amount: amount };
        axios.post('http://localhost:5000/api/records', body, config)
            .then(response => setData((prev) => [...prev, response.data]));
        
        setAmount('');
    }

    return (
        <div style={{marginBottom: '20px'}}>
            <input type="text" placeholder='Make A Purchase!' value={amount} onChange={onChange}/>
            <button onClick={onSubmit}>Buy!</button>
        </div>
    )
}

export default AddNewData;