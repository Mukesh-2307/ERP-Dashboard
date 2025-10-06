import React from 'react'
import StatsCard from '../StatsCard'

const StatCards = ({isPopulate, total, totalDeliveries, totalPickups }) => {

    return (
        <div className='rounded-lg h-[150px] grid gap-4 grid-cols-3'>
            <StatsCard total={total || 0} totalDeliveries={totalDeliveries || 0} totalPickups={totalPickups || 0} isPopulate={isPopulate} />
        </div>
    )
}

export default StatCards