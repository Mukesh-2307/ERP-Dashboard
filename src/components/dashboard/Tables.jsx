import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Papa from "papaparse";
import { BsThreeDots } from "react-icons/bs";

// import DeliveryCSV from './OFD.csv';
// import PickupCSV from './Pickup.csv'

const options = [
    { value: 1, label: 'Sushil Kumar Jha' },
    { value: 2, label: 'Amit Kumar' },
];


const Tables = () => {

    const [data, setData] = useState([]);
    const [manager, setManager] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        Papa.parse("/Pickup.csv", {
            download: true,
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (result) => {
                setData(result.data);
            },
            error: (err) => {
                console.error("CSV parse error", err);
                setData([]);
            },
        });
    }, [])

    // {
    //     manager ? data.forEach((row) => {
    //         console.log(row.WM_ID);
    //     }) : console.log("no manager found");
    // }

    const filteredData = manager ? data.filter((row) => row.WM_ID === manager.value) : data;

    const handlePopulate = () => {
        setRows(filteredData);
    };

    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4 bottom-cell'>
            <div className="input-fields flex justify-between items-end">
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor='WM-Select' className='text-sm font-semibold p-1.5'>Assign Agent</label>
                    <div className='w-[220px]'>
                        <Select
                            defaultValue={manager}
                            onChange={setManager}
                            options={options}
                            name="WM-Select"
                        />
                    </div>
                </div>
                <button
                    className='py-2 px-4 bg-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-600 hover:text-white'
                    onClick={handlePopulate}
                >
                    Populate
                </button>
            </div>
            <div>
                <table className="w-full table-auto">
                    <TableHead />
                    <tbody>
                        {rows?.map((row, index) => (
                            <TableRow
                                key={`${row.Tracking_ID || index}-${index}`}
                                TID={row.Tracking_ID}
                                CPD={row.CPD}
                                priority={row.Priorityswap_vert}
                                address={row.Address}
                                pin={row.Pincode}
                                item={row.Item_Type}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TableHead = () => {
    return (
        <thead>
            <tr className="text-sm font-normal border-y-2">
                <th className="text-start p-1.5">Tracking Id</th>
                <th className="text-start p-1.5">CPD</th>
                <th className="text-start p-1.5">Priority</th>
                <th className="text-start p-1.5">Address</th>
                <th className="text-start p-1.5">Pincode</th>
                <th className="text-start p-1.5">Status</th>
                <th className='w-8'></th>
            </tr>
        </thead>
    )
}

const TableRow = ({ TID, CPD, priority, address, pin, item, index }) => {
    return (
        <tr className={index % 2 ? "bg-gray-200" : ""}>
            <td className='p-1.5'>{TID}</td>
            <td className='p-1.5'>{CPD}</td>
            <td className='p-1.5'>{priority}</td>
            <td className='p-1.5'>{address}</td>
            <td className='p-1.5'>{pin}</td>
            <td className='p-1.5'>{item}</td>
            <td className='w-8'>
                <BsThreeDots />
            </td>
        </tr>
    );
}

export default Tables;