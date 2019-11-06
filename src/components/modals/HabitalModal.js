import React, { Component, useState } from 'react'
import styled from 'styled-components';

const ModalInner = styled.div`
    width: 100%;
`



const HabitalModal = ({
    minHabital,
    setMinHabital,
    maxHabital,
    setMaxHabital,
}) => {
    function updateMin(value) {
        setMinHabital(value)
    }
    function updateMax(value) {
        setMaxHabital(value)
    }

    return (
            <ModalInner>
                <label>
                    Min number of habital rooms
                    <input id="minHabital" type="number" step="1" value={minHabital} onChange={e => updateMin(e.target.value)} />
                </label>
                <label>
                    Max number of habital rooms
                    <input id="maxHabital" type="number" step="1" value={maxHabital} onChange={e => updateMax(e.target.value)} />
                </label>
            </ModalInner>
    )
}

export default HabitalModal
