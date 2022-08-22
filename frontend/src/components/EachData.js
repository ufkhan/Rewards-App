import React from 'react';

const EachData = ({record, index, calculateReward}) => {
    console.log("RECORD: ", record);
    let rewardPoints = calculateReward(record.amount);
    
    return (
        <div className="each-data">
            <div>Purchase {index + 1}: ${record.amount}</div>
            <div>Reward Points: {rewardPoints}</div>
        </div>
    )
}

export default EachData;