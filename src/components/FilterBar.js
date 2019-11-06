import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';
import FilterButton from './FilterButton'

import HabitableModal from './modals/HabitableModal'

Modal.setAppElement('#root');

const FilterContainer = styled.div`
    width: calc(100% - 30px);
    border-bottom: 1px solid rgba(200, 200, 200, 0.8);
    padding: 10px 15px;
`
const FilterBar = ({
    setFilters,
    minHabitable,
    setMinHabitable,
    maxHabitable,
    setMaxHabitable,
    habitableIsFiltered,
    setHabitableIsFiltered,
    maxTotalRooms
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
        + 'min_habitable_rooms=' + minHabitable 
        + '&max_habitable_rooms=' + maxHabitable
        ) //add all filters here
    }

    function chooseModal(type) {
        switch(type) {
            case 'habitable':
                return <HabitableModal 
                    minHabitable={minHabitable}
                    setMinHabitable={setMinHabitable}
                    maxHabitable={maxHabitable}
                    setMaxHabitable={setMaxHabitable}
                    habitableIsFiltered={habitableIsFiltered}
                    setHabitableIsFiltered={setHabitableIsFiltered}
                    maxTotalRooms={maxTotalRooms}
                />;
            default:
                return <p>this would be all filters</p>;
        }
    }

    return (
        <>
            <FilterContainer>
                <FilterButton isActive={!habitableIsFiltered} onClick={() => handleOpenModal('habitable')}>Habitable rooms</FilterButton>
            </FilterContainer>
            <Modal isOpen={openModal} onRequestClose={() => handleCloseModal()} shouldCloseOnOverlayClick={true} contentLabel="Number of habitable rooms filter">
                { chooseModal(modalType) }
                <button onClick={() => handleCloseModal()}>Save</button>
            </Modal>
        </>
    )
}

export default FilterBar