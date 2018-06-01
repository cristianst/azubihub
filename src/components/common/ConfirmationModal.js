import React from 'react';
import { Confirm } from 'semantic-ui-react';

const ConfirmationModal = 
    ({
        open = false,
        content = 'Are you sure?', 
        handleCancel = () => null, 
        handleConfirm = () => null
    }) => (
    <div className='confirmationModal'>
        <Confirm
            open={open}
            className='confirmationModal'
            content={content}
            dimmer='blurring'
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        />
    </div>
);

export default ConfirmationModal;