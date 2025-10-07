import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";


const Tables = ({ tableTitle, data, manager, isPopulate, type, hub, caller }) => {

    const filteredDataByHub = hub ? data.filter((row) => row.Hub_ID === hub.value) : data;
    const filteredData = manager ? filteredDataByHub.filter((row) => row.WM_ID === manager.value) : filteredDataByHub;

    const [hiddenIds, setHiddenIds] = React.useState([]);

    React.useEffect(() => {
        setHiddenIds([]);
    }, [data, manager, hub]);

    const visibleData = filteredData.filter((row) => !hiddenIds.includes(row.Tracking_ID));

    const handleDeleteBtn = (trackingId) => {
        setHiddenIds((prev) => (prev.includes(trackingId) ? prev : [...prev, trackingId]));
    };

    return (
        <div className={`rounded-lg p-4 flex flex-col gap-4 ${caller === "mainDashboard" ? "bottom-cell" : "bottom-cell-l"} shadow card-light`}>

            <div className="header">
                <h1 className='card-text-m'>
                    {tableTitle}
                </h1>
            </div>
            <div className='overflow-y-auto overflow-x-hidden custom-scrollbar'>
                <table className="w-full table-fixed">
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '13%' }} />
                        <col style={{ width: '10%' }} />
                        {type === "DELI" && <col style={{ width: '12%' }} />}
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        {caller === "WMDashboard" && <col style={{ width: '10%' }} />}
                    </colgroup>
                    <TableHead type={type} caller={caller} />
                    <tbody>
                        {isPopulate && visibleData.length > 0 ? (
                            visibleData.map((row, index) => (
                                <TableRow
                                    key={`${row.Tracking_ID || index}-${index}`}
                                    TID={row.Tracking_ID}
                                    CPD={row.CPD}
                                    priority={row.Priority}
                                    amount={row.Amount}
                                    address={row.Address}
                                    pin={row.Pincode}
                                    status={row.Status}
                                    item={row.Item_Type}
                                    index={index}
                                    type={type}
                                    caller={caller}
                                    handleDeleteBtn={() => handleDeleteBtn(row.Tracking_ID)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={type === "DELI" ? 7 : 6}
                                    className="text-center p-8 text-gray-500 font-medium"
                                >
                                    {!isPopulate ? "Click 'Populate' to view entries" : "No entries found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TableHead = ({ type, caller }) => {
    return (
        <thead className='t-head sticky top-0'>
            <tr>
                <th className="text-start p-1.5 whitespace-normal break-words">Tracking Id</th>
                <th className="text-start p-1.5 whitespace-normal break-words">CPD</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Priority</th>
                {type === "DELI" && <th className="text-start p-1.5 whitespace-normal break-words">Amount</th>}
                <th className="text-start p-1.5 whitespace-normal break-words">Address</th>
                <th className="text-start p-1.5 whitespace-normal break-words">Pincode</th>
                {type === "DELI" && <th className="text-start p-1.5 whitespace-normal break-words">Status</th>}
                {type === "PICK" && <th className="text-start p-1.5 whitespace-normal break-words">Item Type</th>}
                {caller === "WMDashboard" && <th className="text-start p-1.5 whitespace-normal break-words">Actions</th>}
            </tr>
        </thead>
    )
}

const TableRow = ({ TID, CPD, priority, amount, address, pin, status, item, type, index, caller, handleDeleteBtn }) => {
    
    return (
        <tr className={index % 2 ? "odd-item" : ""}>
            <td className='p-1.5 whitespace-normal break-words'>{TID}</td>
            <td className='p-1.5 whitespace-normal break-words'>{CPD}</td>
            <td className='p-1.5 whitespace-normal break-words'>{priority}</td>
            {type === "DELI" && <td className='p-1.5 whitespace-normal break-words'>Rs {amount}</td>}
            <td className='p-1.5 whitespace-normal break-words'>{address}</td>
            <td className='p-1.5 whitespace-normal break-words'>{pin}</td>
            {type === "DELI" && <td className='p-1.5 whitespace-normal break-words'>{status}</td>}
            {type === "PICK" && <td className='p-1.5 whitespace-normal break-words'>{item}</td>}
            {caller === "WMDashboard" && <td className='cursor-pointer p-1.5 ' onClick={handleDeleteBtn}><FaRegTrashCan size={20} /></td>}
        </tr>
    );
}

export default Tables;