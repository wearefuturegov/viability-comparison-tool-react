import React, { Component, useState } from 'react'
import styled from 'styled-components';

const ModalInner = styled.div`
    width: 100%;
`



const HabitableModal = ({
    minHabitable,
    setMinHabitable,
    maxHabitable,
    setMaxHabitable,
}) => {
    function updateMin(value) {
        setMinHabitable(value)
    }
    function updateMax(value) {
        setMaxHabitable(value)
    }

    return (
            <ModalInner>
                <label>
                    Min number of habitable rooms
                    <input id="minHabitable" type="number" step="1" value={minHabitable} onChange={e => updateMin(e.target.value)} />
                </label>
                <label>
                    Max number of habitable rooms
                    <input id="maxHabitable" type="number" step="1" value={maxHabitable} onChange={e => updateMax(e.target.value)} />
                </label>
            </ModalInner>
    )
}

export default HabitableModal
