import React, { useState, useEffect } from 'react'
import './App.css'
import StatCards from './components/dashboard/StatCards'
import Tables from './components/dashboard/Tables'
import Select from 'react-select';
import Papa from "papaparse";

const WMoptions = [
  { value: 1, label: 'Amarjit Kumar'},
  { value: 2, label: 'Sumit Mandal R'},
  { value: 3, label: 'Suraj Kumar'},
  { value: 4, label: 'Ankit Das'},
  { value: 5, label: 'Swastik Sathpathy'},
  { value: 6, label: 'Manas Kumar'},
  { value: 7, label: 'Rajesh Kumar'},
  { value: 8, label: 'Vickey Kumar'},
  { value: 9, label: 'Nitu Kumari'},
  { value: 10, label: 'Govinda Kumar'},
  { value: 11, label: 'vishal Kumar'},
];

const Huboptions = [
  { value: 'HJR', label: 'CABT Hajipur' },
  { value: 'PAT', label: 'Patliputra Hub' },
];

function App() {

  const [manager, setManager] = useState(null);
  const [hub, setHub] = useState(null);
  const [deliveryData, setDeliveryData] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [isPopulate, setIsPopulate] = useState(false);

  useEffect(() => {
    Papa.parse("/Pickup_All_Hubs.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        setPickupData(result.data);
      },
      error: (err) => {
        console.error("CSV parse error", err);
        setPickupData([]);
      },
    })
    Papa.parse("/OFD_All_Hubs.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        setDeliveryData(result.data);
      },
      error: (err) => {
        console.error("CSV parse error", err);
        setDeliveryData([]);
      },
    })
  }, [])

  const handlePopulate = () => {
    if (manager) {
      setIsPopulate(true);
    }
  };

  return (
    <div className='grid gap-4 p-2 sm:p-4 grid-rows-[auto_1fr]'>
      <StatCards pickupData={pickupData} deliveryData={deliveryData} manager={manager} />
      <div className="input-fields flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center min-h-20 px-3 sm:px-4 card-light rounded-lg">
        <div className='flex gap-4 sm:gap-8 w-full sm:w-auto'>
          <div>
            <label htmlFor='WM-Select' className='text-xs sm:text-sm font-bold p-1.5'>Assign Agent</label>
            <div className='w-full sm:w-[220px]'>
              <Select
                defaultValue={manager}
                onChange={setManager}
                options={WMoptions}
                name="WM-Select"
              />
            </div>
          </div>
          <div>
            <label htmlFor='WM-Select' className='text-xs sm:text-sm font-bold p-1.5'>Hubs</label>
            <div className='w-full sm:w-[220px]'>
              <Select
                defaultValue={hub}
                onChange={setHub}
                options={Huboptions}
                name="WM-Select"
              />
            </div>
          </div>
        </div>
        <button
          className='btn py-2 px-4 rounded-lg font-semibold cursor-pointer w-full sm:w-auto'
          onClick={handlePopulate}
        >
          Populate
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Tables tableTitle="Delivery" data={deliveryData} manager={manager} isPopulate={isPopulate} type="DELI" />
        <Tables tableTitle="Pickup" data={pickupData} manager={manager} isPopulate={isPopulate} type="PICK" />
      </div>
      <div className="flex justify-end pr-4">
        <button className='btn py-2 px-4 rounded-lg font-semibold cursor-pointer w-full sm:w-auto'>Save</button>
      </div>
    </div>
  )
}

export default App
