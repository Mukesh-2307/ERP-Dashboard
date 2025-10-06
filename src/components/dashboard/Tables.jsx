import React from 'react';


const Tables = ({ tableTitle, data, manager, isPopulate, type, hub, caller }) => {

    const filteredDataByHub = hub ? data.filter((row) => row.Hub_ID === hub.value) : data;
    const filteredData = manager ? filteredDataByHub.filter((row) => row.WM_ID === manager.value) : filteredDataByHub;

    // console.log(filteredData);

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
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '10%' }} />
                        {type === "DELI" && <col style={{ width: '10%' }} />}
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                    </colgroup>
                    <TableHead type={type} />
                    <tbody>
                        {isPopulate && filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
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

const TableHead = ({ type }) => {
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
            </tr>
        </thead>
    )
}

const TableRow = ({ TID, CPD, priority, amount, address, pin, status, item, type, index }) => {
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
        </tr>
    );
}

export default Tables;