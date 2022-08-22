import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EachData from './EachData';
import AddNewData from './AddNewData';

const UserData = () => {
    const [data, setData] = useState([]);
    const [username, setUserName] = useState('');
    useEffect(() => {
        let token = localStorage.getItem("token");
        console.log("TOKEN: ", token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:5000/api/records', config)
            .then(response => setData(response.data))
        
        axios.get('http://localhost:5000/api/users/me', config)
            .then(response => setUserName(response.data.name))
    }, [])

    let totalpoints = 0;
    for (let i = 0; i < data.length; ++i) {
        totalpoints += calculateReward(data[i].amount);
    }
    
    return (
        <div style={{marginTop: '20px'}}>
            <div className='welcome-rewards'><b>Hello {username}! Make a purchase below and get reward points!</b></div>
            <AddNewData setData={setData}/>
            {data.map((record, index) => <EachData record={record} index={index} calculateReward={calculateReward}/>)}
            {data.length === 0 ? <div>No Purchases Yet!</div> : ''}
            <div className='total-points'>Total Reward Points: {totalpoints}</div>
        </div>
    )
}

const calculateReward = (amount) => {
    if (amount <= 50) return 0;
    if (amount > 50 && amount <= 100) return amount - 50;
    return 50 + 2 * (amount - 100);
}

export default UserData;