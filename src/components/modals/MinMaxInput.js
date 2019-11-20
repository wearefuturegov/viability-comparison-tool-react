import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

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

const MinMaxInput = ({
    step,
    toggleActiveMarker,
    handleCloseModal,
    min,
    setMin,
    setMinURL,
    max,
    setMax,
    setMaxURL,
    isFiltered,
    setIsFiltered,
    maxTotal,
    setButtonText
}) => {
    const [rangeVals, setRangeVals] = useState({min: min, max: max});

    function updateMin(value) {
        setMin(value);
        setMinURL(value);
        setRangeVals({min: value, max: rangeVals.max});
        if(value !== null) {
            toggleActiveMarker(0);
        }
        checkFiltered();
    }
    function updateMax(value) {
        setMax(value);
        setMaxURL(value);
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
        if (min !== 0 || max !== maxTotal) {
            setIsFiltered(true);
        }
    }

    function handleClear() {
        document.getElementById('minInput').value = 0;
        document.getElementById('maxInput').value = maxTotal;
        updateMin(0);
        updateMax(maxTotal);
        setRangeVals({min: 0, max: maxTotal})
        setMinURL(0);
    }


    useEffect(() => {
        if(document.getElementById('maxInput').value === maxTotal && document.getElementById('minInput').value === 0) {
            setMax(maxTotal);
        }
    }, [maxTotal, setMax, setButtonText]);
    
    return (
        <>
            <InputRange
                maxValue={maxTotal}
                minValue={0}
                value={rangeVals}
                step={step}
                onChange={value => setRangeVals(value)}
                onChangeComplete={value => updateRangeVals(value)}
                    />

            <label>
                Min
                <input name="minInput" id="minInput" type="number" step={step/2} min={0} max={maxTotal} value={min} onChange={e => updateMin(e.target.value)} />
            </label>
            <label>
                Max
                <input name="maxInput" id="maxInput" type="number" step={step/2} min={0} max={maxTotal} value={max} onChange={e => updateMax(e.target.value)} />
            </label>

            <ButtonBar>
                <button className="clear_button" disabled={!isFiltered} onClick={() => handleClear()}>Clear</button>
                <Button type="primary" onClick={handleCloseModal}>Save</Button>
            </ButtonBar>
        </>
    )
}

export default MinMaxInput
