import React from 'react'

const StatsCard = ({ total, totalDeliveries, totalPickups, isPopulate }) => {
    return (
        <>
            <Card title="Total Entries" value={total} className="card-dark" isPopulate={isPopulate} />
            <Card title="Total Deliveries" value={totalDeliveries} className="card-light" isPopulate={isPopulate} />
            <Card title="Total Pickups" value={totalPickups} className="card-light" isPopulate={isPopulate} />
        </>
    )
}

const Card = ({ title, value, className, isPopulate }) => {
    return (
        <div className={`rounded-lg shadow text-center flex flex-col justify-center ${className}`}>
            {isPopulate ? <h1 className='card-text-l'>{value}</h1> : <h1 className='card-text-l'>{value}</h1>}
            <p className='font-semibold'>{title}</p>
        </div>
    )
}

export default StatsCard