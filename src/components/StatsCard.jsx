import React from 'react'

const StatsCard = () => {
    return (
        <>
            <Card title="Total Entries" value={100} />
            <Card title="Total Deliveries" value={44} />
            <Card title="Total Pickups" value={56} />
        </>
    )
}

const Card = ({ title, value }) => {
    return (
        <div className='bg-white text-black rounded-lg p-4'>
            <p>{title}</p>
            <h1>{value}</h1>
        </div>
    )
}

export default StatsCard