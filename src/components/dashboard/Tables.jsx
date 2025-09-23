import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 1, label: 'Sushil Kumar Jha' },
    { value: 2, label: 'Amit Kumar' },
];


const Tables = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4 bottom-cell'>
            <div className="input-fields flex flex-col items-start gap-2">
                <label htmlFor='WM-Select'>Assign Agent</label>
                <div className='w-[220px]'>
                    <Select
                        defaultValue={"Select Agent"}
                        onChange={setSelectedOption}
                        options={options}
                        name="WM-Select"
                    />
                </div>
            </div>
            <div className="tables">
                <p>
                    {selectedOption?.value}
                </p>
            </div>
        </div>
    )
}

export default Tables;