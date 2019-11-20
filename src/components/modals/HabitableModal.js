import React from 'react'
import styled from 'styled-components';
import 'react-input-range/lib/css/index.css';
import MinMaxInput from './MinMaxInput';

const ModalInner = styled.div`
    width: 100%;
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
    return (
            <ModalInner>
                <h2>Number of habitable rooms</h2>
                <MinMaxInput
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={handleCloseModal}
                    min={minHabitable}
                    setMin={setMinHabitable}
                    setMinURL={setMinHabitableURL}
                    max={maxHabitable}
                    setMax={setMaxHabitable}
                    setMaxURL={setMaxHabitableURL}
                    isFiltered={habitableIsFiltered}
                    setIsFiltered={setHabitableIsFiltered}
                    maxTotal={maxTotalHabitable}
                    setButtonText={setHabitableButtonText}
                        />
            </ModalInner>
    )
}

export default HabitableModal
