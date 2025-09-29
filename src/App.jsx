import React, { useState, useEffect } from 'react'
import './App.css'
import InputFields from './components/dashboard/InputFields'
import Tables from './components/dashboard/Tables'
import Select from 'react-select';
import Papa from "papaparse";

const WMoptions = [
  { value: 1, label: 'Sushil Kumar Jha' },
  { value: 2, label: 'Amit Kumar' },
];

function App() {

  const [manager, setManager] = useState(null);
  const [deliveryData, setDeliveryData] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [isPopulate, setIsPopulate] = useState(false);

  useEffect(() => {
    setIsPopulate(false);
    Papa.parse("/Pickup.csv", {
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
    Papa.parse("/OFD.csv", {
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
  }, [manager])

  const handlePopulate = () => {
    if (manager) {
      setIsPopulate(true);
    }
  };

  return (
    <div className='grid gap-4 p-4 grid-rows-[220px_1fr]'>
      <InputFields />
      <div className="input-fields flex justify-between items-center h-20">
        <div className='flex gap-8'>
          <div>
            <label htmlFor='WM-Select' className='text-sm font-semibold p-1.5'>Assign Agent</label>
            <div className='w-[220px]'>
              <Select
                defaultValue={manager}
                onChange={setManager}
                options={WMoptions}
                name="WM-Select"
              />
            </div>
          </div>
        </div>
        <button
          className='btn py-2 px-4 rounded-lg font-semibold cursor-pointer'
          onClick={handlePopulate}
        >
          Populate
        </button>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Tables tableTitle="Delivery" data={deliveryData} manager={manager} isPopulate={isPopulate} />
        <Tables tableTitle="Pickup" data={pickupData} manager={manager} isPopulate={isPopulate} />
      </div>
    </div>
  )
}

export default App
