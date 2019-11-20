import React from 'react'
import styled from 'styled-components';
import MinMaxInput from './MinMaxInput';

const ModalInner = styled.div`
    width: 100%;
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
    return (
            <ModalInner>
                <h2>Number of residential units</h2>
                <MinMaxInput
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={handleCloseModal}
                    min={minResidential}
                    setMin={setMinResidential}
                    setMinURL={setMinResidentialURL}
                    max={maxResidential}
                    setMax={setMaxResidential}
                    setMaxURL={setMaxResidentialURL}
                    isFiltered={residentialIsFiltered}
                    setIsFiltered={setResidentialIsFiltered}
                    maxTotal={maxTotalResidential}
                    setButtonText={setResidentialButtonText}
                        />
            </ModalInner>
    )
}

export default ResidentialModal
