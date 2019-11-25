import React from 'react'
import styled from 'styled-components';
import 'react-input-range/lib/css/index.css';
import ToggleSwitch from './ToggleSwitch'
import Button from '../Button';

const ModalInner = styled.div`
    width: 100%;
`
const ButtonBar = styled.div`
    width: calc(100% - 40px);
    position: absolute;
    bottom: 20px; 
    padding-top: 15px;
    border-top: 1px solid rgba(200, 200, 200, 0.3);
    text-align: right;

    @media screen and (max-width: 600px) {
        position: relative;
        margin-top: 50px;
        width: 100%;
    }
`

const CommercialModal = ({
    toggleActiveMarker,
    handleCloseModal,
    commercial,
    setCommercial,
    setCommercialURL
}) => {

    // function handleClear() {
    //     handleCloseModal();
        
    //     setCommercialURL('off');
    //     setCommercial('off');
    // }
    return (
            <ModalInner>
                <h2>Show commercial space?</h2>
                <ToggleSwitch 
                    toggleActiveMarker={toggleActiveMarker}
                    values={['with', 'off', 'without']} 
                    selected={commercial} 
                    setCommercial={setCommercial} 
                    setCommercialURL={setCommercialURL} 
                />
                <ButtonBar>
                    {/* <button className="clear_button" disabled={commercial === 'off'} onClick={() => handleClear()}>Clear</button> */}
                    <Button type="primary" onClick={handleCloseModal}>Save</Button>
                </ButtonBar>
            </ModalInner>
    )
}

export default CommercialModal
