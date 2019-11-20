import React from 'react'
import styled from 'styled-components';
import 'react-input-range/lib/css/index.css';
import MinMaxInput from './MinMaxInput';

const ModalInner = styled.div`
    width: 100%;
`

const GDVModal = ({
    toggleActiveMarker,
    handleCloseModal,
    minGDV,
    setMinGDV,
    setMinGDVURL,
    maxGDV,
    setMaxGDVURL,
    setMaxGDV,
    GDVIsFiltered,
    setGDVIsFiltered,
    maxTotalGDV,
    setGDVButtonText
}) => {
    return (
            <ModalInner>
                <h2>Gross Development Value (£)</h2>
                <MinMaxInput
                    step={1000}
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={handleCloseModal}
                    min={minGDV}
                    setMin={setMinGDV}
                    setMinURL={setMinGDVURL}
                    max={maxGDV}
                    setMax={setMaxGDV}
                    setMaxURL={setMaxGDVURL}
                    isFiltered={GDVIsFiltered}
                    setIsFiltered={setGDVIsFiltered}
                    maxTotal={maxTotalGDV}
                    setButtonText={setGDVButtonText}
                        />
            </ModalInner>
    )
}

export default GDVModal
