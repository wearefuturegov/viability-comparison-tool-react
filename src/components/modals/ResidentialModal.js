import React, { useEffect } from 'react'
import styled from 'styled-components';
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
`

const ResidentialModal = ({
    toggleActiveMarker,
    handleCloseModal,
    minResidential,
    setMinResidential,
    setMinResidentialURL,
    maxResidential,
    setMaxResidentialURL,
    setMaxResidential,
    residentialIsFiltered,
    setResidentialIsFiltered,
    maxTotalResidential,
    setResidentialButtonText
}) => {
    function updateMin(value) {
        setMinResidential(value);
        setMinResidentialURL(value);
        if(value !== null) {
            toggleActiveMarker(0);
        }
    }
    function updateMax(value) {
        setMaxResidential(value);
        setMaxResidentialURL(value);
        if(value !== null) {
            toggleActiveMarker(0);
        }
    }
    function handleClear() {
        document.getElementById('minResidentialInput').value = 0;
        document.getElementById('maxResidentialInput').value = maxTotalResidential;
        
        updateMin(0);
        updateMax(maxTotalResidential);
        setMinResidentialURL(0);
    }

    useEffect(() => {
        if(document.getElementById('maxResidentialInput').value === maxTotalResidential && document.getElementById('minResidentialInput').value === 0) {
            setMaxResidential(maxTotalResidential);
        }
    }, [maxTotalResidential, setMaxResidential, setResidentialButtonText]);
    
    return (
            <ModalInner>
                <h2>Number of residential units</h2>
                <label>
                    Min
                    <input name="minResidentialInput" id="minResidentialInput" type="number" step="1" min={0} max={maxTotalResidential} value={minResidential} onChange={e => updateMin(e.target.value)} />
                </label>
                <label>
                    Max
                    <input name="maxResidentialInput" id="maxResidentialInput" type="number" step="1" min={0} max={maxTotalResidential} value={maxResidential} onChange={e => updateMax(e.target.value)} />
                </label>

                <ButtonBar>
                    <button className="clear_button" disabled={!residentialIsFiltered} onClick={() => handleClear()}>Clear</button>
                    <Button type="primary" onClick={handleCloseModal}>Save</Button>
                </ButtonBar>

            </ModalInner>
    )
}

export default ResidentialModal
