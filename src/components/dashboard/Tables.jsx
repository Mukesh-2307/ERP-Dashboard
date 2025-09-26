import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Papa from "papaparse";
import { BsThreeDots } from "react-icons/bs";

// import DeliveryCSV from './OFD.csv';
// import PickupCSV from './Pickup.csv'

const WMoptions = [
    { value: 1, label: 'Sushil Kumar Jha' },
    { value: 2, label: 'Amit Kumar' },
];

const Tableoptions = [
    { value: '/OFD.csv', label: 'Delivery' },
    { value: '/Pickup.csv', label: 'Pickup' },
];


const Tables = () => {

    const [data, setData] = useState([]);
    const [manager, setManager] = useState(null);
    const [dataOpt, setDataOpt] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (dataOpt?.value) {
            console.log(dataOpt.value);
            // Papa.parse("/Pickup.csv", {
            Papa.parse(dataOpt.value, {
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
            })
        }
    }, [dataOpt])
    // }, [])

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
        <div className='rounded-lg p-4 flex flex-col gap-4 bottom-cell shadow card-light'>
            <div className="input-fields flex justify-between items-end">
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
                    <div>
                        <label htmlFor='WM-Select' className='text-sm font-semibold p-1.5'>Data Options</label>
                        <div className='w-[220px]'>
                            <Select
                                defaultValue={dataOpt}
                                onChange={setDataOpt}
                                options={Tableoptions}
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
            <div className='overflow-y-scroll custom-scrollbar'>
                <table className="w-full table-fixed">
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
        <thead className='t-head sticky top-0'>
            <tr>
                <th className="text-start p-1.5 w-32">Tracking Id</th>
                <th className="text-start p-1.5 w-20">CPD</th>
                <th className="text-start p-1.5 w-24">Priority</th>
                <th className="text-start p-1.5 w-64">Address</th>
                <th className="text-start p-1.5 w-24">Pincode</th>
                <th className="text-start p-1.5 w-32">Status</th>
                <th className='w-8'></th>
            </tr>
        </thead>
    )
}

const TableRow = ({ TID, CPD, priority, address, pin, item, index }) => {
    return (
        <tr className={index % 2 ? "odd-item" : ""}>
            <td className='p-1.5 w-32'>{TID}</td>
            <td className='p-1.5 w-20'>{CPD}</td>
            <td className='p-1.5 w-24'>{priority}</td>
            <td className='p-1.5 w-64'>{address}</td>
            <td className='p-1.5 w-24'>{pin}</td>
            <td className='p-1.5 w-32'>{item}</td>
            <td className='w-8'>
                <BsThreeDots />
            </td>
        </tr>
    );
}

export default Tables;