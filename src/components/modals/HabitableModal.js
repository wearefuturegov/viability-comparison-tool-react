import React, { useEffect } from 'react'
import styled from 'styled-components';

const ModalInner = styled.div`
    width: 100%;
`

const HabitableModal = ({
    minHabitable,
    setMinHabitable,
    maxHabitable,
    setMaxHabitable,
    habitableIsFiltered,
    setHabitableIsFiltered,
    maxTotalRooms
}) => {

    function updateMin(value) {
        setMinHabitable(value);
        if(value !== null) {
            setHabitableIsFiltered(true);
        }
    }
    function updateMax(value) {
        setMaxHabitable(value);
        if(value !== null) {
            setHabitableIsFiltered(true);
        }
    }
    function handleClear() {
        setHabitableIsFiltered(false);
        setMinHabitable(0);
        setMaxHabitable(maxTotalRooms);
        document.getElementById('minHabitableInput').value = 0;
        document.getElementById('maxHabitableInput').value = maxTotalRooms;
    }

    useEffect(() => {
        setMaxHabitable(maxTotalRooms);
        if(document.getElementById('maxHabitableInput').value !== maxTotalRooms || document.getElementById('minHabitableInput').value !== 0) {
            setHabitableIsFiltered(true);
        } else {
            setHabitableIsFiltered(false);
        }
    }, [maxTotalRooms, setHabitableIsFiltered, setMaxHabitable]);

    return (
            <ModalInner>
                <label>
                    Min number of habitable rooms
                    <input name="minHabitableInput" id="minHabitableInput" type="number" step="1" max={maxTotalRooms} value={minHabitable} onChange={e => updateMin(e.target.value)} />
                </label>
                <label>
                    Max number of habitable rooms
                    <input name="maxHabitableInput" id="maxHabitableInput" type="number" step="1" max={maxTotalRooms} value={maxHabitable} onChange={e => updateMax(e.target.value)} />
                </label>

                <button className="clear_button" disabled={!habitableIsFiltered} onClick={() => handleClear()}>Clear</button>
            </ModalInner>
    )
}

export default HabitableModal
