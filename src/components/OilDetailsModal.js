import React, { useState } from 'react';

function OilDetailsModal({ isModalChecked, modalCheckSetter, item }) {

    const handleModalCheck = () => {
        modalCheckSetter(!isModalChecked);
    }

    return (
        <div className='font-mtavruli'>
            <input type="checkbox" id="my-details-modal-5" value={isModalChecked} onChange={handleModalCheck} className="modal-toggle hidden" />
            <div className={`${isModalChecked ? 'block' : 'hidden'}  fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center bg-primary/50`}>
                <div className="modal-box p-8 relative w-9/12 max-w-5xl bg-white rounded drop-shadow-lg">
                    <div className="w-fit absolute z-50 bg-primary p-1 top-3.5 right-3.5 rounded flex justify-end">
                        <label htmlFor="my-details-modal-5" className="btn contents cursor-pointer">
                            <img alt='dkd' src='./ph_x-bold.svg' />
                        </label>
                    </div>
                    <div className='flex md:flex-row flex-col items-start text-left gap-8'>
                        <img className='w-32' src={`${item && item.imageUrl}`} />
                        <div className='flex flex-col gap-2'>
                            <p className={`${item && item.productType == "premium" ? 'bg-yellow-400' : 
                        'bg-gray-500 text-white'} text-secondary pt-1 px-2 rounded w-fit uppercase`}>{item && item.productType}</p>
                            <p>{item && item.name}</p>
                            <p className='text-sm'>{item && item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OilDetailsModal;