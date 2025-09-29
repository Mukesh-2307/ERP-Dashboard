import React from 'react';
import { BsThreeDots } from "react-icons/bs";


const Tables = ({ tableTitle, data, manager, isPopulate }) => {

    const filteredData = manager ? data.filter((row) => row.WM_ID === manager.value) : data;

    return (
        <div className='rounded-lg p-4 flex flex-col gap-4 bottom-cell shadow card-light'>

            <div className="header">
                <h1 className='card-text-m'>
                    {tableTitle}
                </h1>
            </div>
            <div className='overflow-y-auto overflow-x-hidden custom-scrollbar'>
                <table className="w-full table-fixed">
                    <colgroup>
                        <col style={{ width: '16%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '5%' }} />
                    </colgroup>
                    <TableHead />
                    <tbody>
                        {isPopulate && filteredData.map((row, index) => (
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
                <th className="text-start p-1.5 whitespace-normal break-words">Tracking Id</th>
                <th className="text-start p-1.5 whitespace-normal break-words">CPD</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Priority</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Address</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Pincode</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Status</th>
                <th></th>
            </tr>
        </thead>
    )
}

const TableRow = ({ TID, CPD, priority, address, pin, item, index }) => {
    return (
        <tr className={index % 2 ? "odd-item" : ""}>
            <td className='p-1.5 whitespace-normal break-words'>{TID}</td>
            <td className='p-1.5 whitespace-normal break-words'>{CPD}</td>
            <td className='p-1.5 whitespace-normal break-words'>{priority}</td>
            <td className='p-1.5 whitespace-normal break-words'>{address}</td>
            <td className='p-1.5 whitespace-normal break-words'>{pin}</td>
            <td className='p-1.5 whitespace-normal break-words'>{item}</td>
            <td className='p-1.5'>
                <BsThreeDots />
            </td>
        </tr>
    );
}

export default Tables;