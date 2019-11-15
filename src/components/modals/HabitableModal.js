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

const HabitableModal = ({
    toggleActiveMarker,
    handleCloseModal,
    minHabitable,
    setMinHabitable,
    setMinHabitableURL,
    maxHabitable,
    setMaxHabitableURL,
    setMaxHabitable,
    habitableIsFiltered,
    setHabitableIsFiltered,
    maxTotalHabitable,
    setHabitableButtonText
}) => {
    function updateMin(value) {
        setMinHabitable(value);
        setMinHabitableURL(value);
        if(value !== null) {
            toggleActiveMarker(0);
        }
    }
    function updateMax(value) {
        setMaxHabitable(value);
        setMaxHabitableURL(value);
        if(value !== null) {
            toggleActiveMarker(0);
        }
    }
    function handleClear() {
        document.getElementById('minHabitableInput').value = 0;
        document.getElementById('maxHabitableInput').value = maxTotalHabitable;
        
        updateMin(0);
        updateMax(maxTotalHabitable);
        setMinHabitableURL(0);
    }

    useEffect(() => {
        if(document.getElementById('maxHabitableInput').value === maxTotalHabitable && document.getElementById('minHabitableInput').value === 0) {
            setMaxHabitable(maxTotalHabitable);
        }
    }, [maxTotalHabitable, setMaxHabitable, setHabitableButtonText]);
    
    return (
            <ModalInner>
                <h2>Number of habitable rooms</h2>
                <label>
                    Min
                    <input name="minHabitableInput" id="minHabitableInput" type="number" step="1" min={0} max={maxTotalHabitable} value={minHabitable} onChange={e => updateMin(e.target.value)} />
                </label>
                <label>
                    Max
                    <input name="maxHabitableInput" id="maxHabitableInput" type="number" step="1" min={0} max={maxTotalHabitable} value={maxHabitable} onChange={e => updateMax(e.target.value)} />
                </label>

                <ButtonBar>
                    <button className="clear_button" disabled={!habitableIsFiltered} onClick={() => handleClear()}>Clear</button>
                    <Button type="primary" onClick={handleCloseModal}>Save</Button>
                </ButtonBar>

            </ModalInner>
    )
}

export default HabitableModal
