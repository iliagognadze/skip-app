import React, { useState } from 'react';
import LoadingSpin from './LoadingSpin';

const LoadingModal = () => {

    return (
        <div className='font-mtavruli'>
            <div className={`fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center bg-primary/50`}>
                <LoadingSpin />
            </div>
        </div>
    );
}

export default LoadingModal;