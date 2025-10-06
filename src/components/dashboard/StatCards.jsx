import React from 'react'
import StatsCard from '../StatsCard'

const StatCards = ({ deliveryData, pickupData, manager }) => {
    const totalDeliveries = manager ? deliveryData.filter((row) => row.WM_ID === manager.value) : 0;
    const totalPickups = manager ? pickupData.filter((row) => row.WM_ID === manager.value) : 0;
    const total = totalDeliveries.length + totalPickups.length;

    return (
        <div className='rounded-lg h-[150px] grid gap-4 grid-cols-3'>
            <StatsCard total={total || 0} totalDeliveries={totalDeliveries.length || 0} totalPickups={totalPickups.length || 0} />
        </div>
    )
}

export default StatCards