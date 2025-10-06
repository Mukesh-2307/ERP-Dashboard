import React from 'react'

const StatsCard = ({ total, totalDeliveries, totalPickups }) => {
    return (
        <>
            <Card title="Total Entries" value={total} className="card-dark" />
            <Card title="Total Deliveries" value={totalDeliveries} className="card-light" />
            <Card title="Total Pickups" value={totalPickups} className="card-light" />
        </>
    )
}

const Card = ({ title, value, className }) => {
    return (
        <div className={`rounded-lg shadow text-center flex flex-col justify-center ${className}`}>
            <h1 className='card-text-l'>{value}</h1>
            <p className='font-semibold'>{title}</p>
        </div>
    )
}

export default StatsCard