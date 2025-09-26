import React from 'react'

const StatsCard = () => {
    return (
        <>
            <Card title="Total Entries" value={100} className="card-dark" />
            <Card title="Total Deliveries" value={44} className="card-light" />
            <Card title="Total Pickups" value={56} className="card-light" />
        </>
    )
}

const Card = ({ title, value, className }) => {
    return (
        <div className={`rounded-lg p-4 shadow flex flex-col justify-between ${className}`}>
            <p className='font-semibold'>{title}</p>
            <h1 className='card-text-l py-5'>{value}</h1>
        </div>
    )
}

export default StatsCard