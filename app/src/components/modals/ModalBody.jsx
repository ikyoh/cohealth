import React from 'react';

const ModalBody = ({ height = 550, children }) => {
    return (
        <div className="relative md:h-[550px]">
            {children}
        </div>
    )
}

export default ModalBody;
