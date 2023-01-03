import React, { useState } from 'react';
import './ModalInputBlock.scss';

type ModalInputBlockType = {
    placeholder: string;
};
const ModalInputBlock = ({ placeholder }: ModalInputBlockType) => {
    const [valid, setValid] = useState(true);
    return (
        <div className="modal__input-block">
            <input className="modal__input" type="text" placeholder={placeholder} />
            {!valid && <p className="modal__error">Error</p>}
            {/* <div onClick={() => setValid(false)}>click</div> */}
        </div>
    );
};

export default ModalInputBlock;
