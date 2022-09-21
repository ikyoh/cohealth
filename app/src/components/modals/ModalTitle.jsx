import React from 'react';
import ModalCloseButton from './ModalCloseButton';

const ModalTitle = ({ title, handleCloseModal }) => {
    return (
        <div className='flex justify-between items-center border-b'>
            <div className="text-primary p-2 md:p-4 text-xl font-light">
                {title}
            </div>
            <ModalCloseButton handleCloseModal={handleCloseModal} />
        </div>
    );
}

export default ModalTitle;
