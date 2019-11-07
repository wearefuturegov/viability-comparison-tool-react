import React, { useState } from 'react';
import './filter-styles.scss'
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from './Button';

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

    const [habitableButtonText, setHabitableButtonText] = useState('Habitable rooms');
    
    function handleOpenModal(type) {
        setOpenModal(true);
        setModalType(type);
    }
  
    const handleCloseModal = () => {
        setOpenModal(false);
        setModalType('');
        
        updateFilterText();
        setFilters('?' 
        + 'min_habitable_rooms=' + minHabitable 
        + '&max_habitable_rooms=' + maxHabitable
        ) //add all other filters here
    }

    function updateFilterText() {
        if(habitableIsFiltered) {
            if (minHabitable !== 0) {
                if (maxHabitable !== maxTotalRooms) {
                    setHabitableButtonText(minHabitable + ' - ' + maxHabitable);
                } else {
                    setHabitableButtonText(minHabitable + '+ habitable rooms');
                }
            } else {
                setHabitableButtonText('Up to ' + maxHabitable + ' habitable rooms');
            }
        } else {
            setHabitableButtonText('Habitable rooms');
        }
    }

    function chooseModal(type, closeFunction) {
        switch(type) {
            case 'habitable':
                return <HabitableModal 
                    handleCloseModal={closeFunction}
                    minHabitable={minHabitable}
                    setMinHabitable={setMinHabitable}
                    maxHabitable={maxHabitable}
                    setMaxHabitable={setMaxHabitable}
                    habitableIsFiltered={habitableIsFiltered}
                    setHabitableIsFiltered={setHabitableIsFiltered}
                    maxTotalRooms={maxTotalRooms}
                    setHabitableButtonText={setHabitableButtonText}
                />;
            default:
                return <p>this would be all filters</p>;
        }
    }

    return (
        <>
            <FilterContainer>
                <Button type={'filterBtn ' + (!habitableIsFiltered ? '' : 'primary')} onClick={() => handleOpenModal('habitable')}>{habitableButtonText}</Button>
            </FilterContainer>
            <Modal isOpen={openModal} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={true} contentLabel="Number of habitable rooms filter">
                { chooseModal(modalType, handleCloseModal) }
            </Modal>
        </>
    )
}

export default FilterBar