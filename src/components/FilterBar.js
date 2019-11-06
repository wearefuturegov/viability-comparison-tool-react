import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';
import FilterButton from './FilterButton'

import HabitalModal from './modals/HabitalModal'

const FilterContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(200, 200, 200, 0.8);
    padding: 15px;
`


const FilterBar = ({
    setFilters,
    minHabital,
    setMinHabital,
    maxHabital,
    setMaxHabital,
}) => {
    const [openModal, setOpenModal] =  useState(false);
    const [modalType, setModalType] =  useState('');
    
    function handleOpenModal(type) {
        setOpenModal(true);
        setModalType(type);
    }
  
    function handleCloseModal() {
        setOpenModal(false);
        setModalType('');
        setFilters('?' 
        + 'min_habitable_rooms=' + minHabital 
        + '&max_habitable_rooms=' + maxHabital
        ) //add all filters here
    }

    function chooseModal(type) {
        switch(type) {
            case 'habital':
                return <HabitalModal 
                    minHabital={minHabital}
                    setMinHabital={setMinHabital}
                    maxHabital={maxHabital}
                    setMaxHabital={setMaxHabital}
                />;
            default:
                return <p>this would be all filters</p>;
        }
    }

    return (
        <>
            <FilterContainer>
                <FilterButton onClick={() => handleOpenModal('habital')}>Habital rooms</FilterButton>
            </FilterContainer>
            <Modal isOpen={openModal} onRequestClose={() => handleCloseModal()} shouldCloseOnOverlayClick={true} contentLabel="Number of habitable rooms filter">
                { chooseModal(modalType) }
                <button onClick={() => handleCloseModal()}>Close Modal</button>
            </Modal>
        </>
    )
}

export default FilterBar
