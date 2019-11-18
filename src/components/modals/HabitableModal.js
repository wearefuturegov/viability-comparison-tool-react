import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

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
    const [rangeVals, setRangeVals] = useState({min: minHabitable, max: maxHabitable});

    function updateMin(value) {
        setMinHabitable(value);
        setMinHabitableURL(value);
        setRangeVals({min: value, max: rangeVals.max});
        if(value !== null) {
            toggleActiveMarker(0);
        }
        checkFiltered();
    }
    function updateMax(value) {
        setMaxHabitable(value);
        setMaxHabitableURL(value);
        setRangeVals({min: rangeVals.min, max: value});
        if(value !== null) {
            toggleActiveMarker(0);
        }
        checkFiltered();
    }
    function updateRangeVals(value) {
        updateMin(value.min);
        updateMax(value.max);
    }
    function checkFiltered() {
        if (minHabitable !== 0 || maxHabitable !== maxTotalHabitable) {
            setHabitableIsFiltered(true);
        } else {
            console.log('minHabitable = ' + minHabitable)
            console.log('maxHabitable = ' + maxHabitable)
            console.log('maxTotalHabitable = ' + maxTotalHabitable)
        }
    }

    function handleClear() {
        document.getElementById('minHabitableInput').value = 0;
        document.getElementById('maxHabitableInput').value = maxTotalHabitable;
        updateMin(0);
        updateMax(maxTotalHabitable);
        setRangeVals({min: 0, max: maxTotalHabitable})
        setMinHabitableURL(0);
    }


    // useEffect(() => {
    //     if(document.getElementById('maxHabitableInput').value === maxTotalHabitable && document.getElementById('minHabitableInput').value === 0) {
    //         setMaxHabitable(maxTotalHabitable);
    //     }
    // }, [maxTotalHabitable, setMaxHabitable, setHabitableButtonText]);
    
    return (
            <ModalInner>
                <h2>Number of habitable rooms</h2>
                <InputRange
                    maxValue={maxTotalHabitable}
                    minValue={0}
                    value={rangeVals}
                    step={10}
                    onChange={value => setRangeVals(value)}
                    onChangeComplete={value => updateRangeVals(value)}
                        />

                <br/>
                <br/>
                <br/>

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
