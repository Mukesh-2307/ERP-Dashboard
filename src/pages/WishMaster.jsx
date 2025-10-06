import React from 'react'
import Tables from '../components/dashboard/Tables';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';

const WishMaster = () => {

    // get id from url using useParams

    const wmName = JSON.parse(localStorage.getItem('manager'));
    const hubName = JSON.parse(localStorage.getItem('hub'));
    const deliveryData = JSON.parse(localStorage.getItem('deliveryData'));
    const pickupData = JSON.parse(localStorage.getItem('pickupData'));

    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate(-1);
    }

    return (
        <div className='p-4 flex flex-col gap-4'>
            <div className='card-light p-4 rounded-lg flex justify-between items-center min-h-[100px]'>
                <div>
                    <FaChevronLeft size={24} onClick={handleBackBtn} className='cursor-pointer' />
                </div>
                <div>
                    <h1 className='font-bold p-1.5 '><span className='secondary-text'>Warehouse Manager's Name:</span> {wmName.label}</h1>
                    <h1 className='font-bold p-1.5 '><span className='secondary-text'>Hub Name:</span> {hubName.label}</h1>
                </div>
            </div>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                <Tables tableTitle="Delivery" data={deliveryData} manager={wmName} hub={hubName} isPopulate={true} type="DELI" />
                <Tables tableTitle="Pickup" data={pickupData} manager={wmName} hub={hubName} isPopulate={true} type="PICK" />
            </div>
            <div className="flex justify-end gap-4 pr-4">
                <button className='btn py-2 px-4 rounded-lg font-semibold cursor-pointer w-full sm:w-auto'>Save</button>
                <button className='btn py-2 px-4 rounded-lg font-semibold cursor-pointer w-full sm:w-auto'>Save and Confirm</button>
            </div>
        </div>
    )
}

export default WishMaster