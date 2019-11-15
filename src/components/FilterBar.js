import React, { useState, useEffect } from 'react';
import './filter-styles.scss'
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from './Button';

import HabitableModal from './modals/HabitableModal'

Modal.setAppElement('#root');

const FilterContainer = styled.div`
    width: calc(100% - 30px);
    border-bottom: 1px solid rgba(200, 200, 200, 0.8);
    padding: 9px 15px;
`
const FilterBar = ({
    toggleActiveMarker,
    setFilters,
    minHabitable,
    setMinHabitable,
    setMinHabitableURL,
    maxHabitable,
    setMaxHabitableURL,
    setMaxHabitable,
    habitableIsFiltered,
    setHabitableIsFiltered,
    maxTotalRooms,
    minHabitableURL,
    maxHabitableURL
}) => {
    const [openModal, setOpenModal] =  useState(false);
    const [setupFilters, changeSetupFilters] =  useState(false);
    const [modalType, setModalType] =  useState('');

    const [habitableButtonText, setHabitableButtonText] = useState('Habitable rooms');
    

    useEffect(() => {
        if((maxHabitableURL === undefined && minHabitableURL === undefined) || (maxHabitableURL === maxTotalRooms && minHabitableURL === 0)) {
            setHabitableIsFiltered(false);
        } else {
            if(maxHabitableURL !== maxTotalRooms || minHabitableURL !== 0) {
                setHabitableIsFiltered(true);
                setMinHabitableURL(minHabitable);
                setMaxHabitableURL(maxHabitable);

                setFilters('?' 
                + 'min_habitable_rooms=' + minHabitable 
                + '&max_habitable_rooms=' + maxHabitable
                ) //add all other filters here
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setupFilters]);



    useEffect(() => {
        function setupFilterText() {
            if(habitableIsFiltered) {
                if (minHabitable !== 0) {
                    if (maxHabitable !== maxTotalRooms) {
                        setHabitableButtonText(minHabitable + ' - ' + maxHabitable + ' habitable rooms');
                    } else {
                        setHabitableButtonText(minHabitable + '+ habitable rooms');
                    }
                } else {
                    if(maxTotalRooms === maxHabitable) {
                        setHabitableIsFiltered(false);
                        setHabitableButtonText('Habitable rooms');
                    } else {
                        setHabitableButtonText('Up to ' + maxHabitable + ' habitable rooms');
                    }
                }
            } else {
                setHabitableButtonText('Habitable rooms');
            }
        }
        
        setupFilterText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [habitableIsFiltered, maxTotalRooms, setupFilters, setHabitableIsFiltered]);




    function handleOpenModal(type) {
        setOpenModal(true);
        setModalType(type);
    }
  
    const handleCloseModal = () => {
        setOpenModal(false);
        setModalType('');

        changeSetupFilters(setupFilters ? false : true);
    }



    function chooseModal(type, closeFunction) {
        switch(type) {
            case 'habitable':
                return <HabitableModal 
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={closeFunction}
                    minHabitable={minHabitable}
                    setMinHabitable={setMinHabitable}
                    setMinHabitableURL={setMinHabitableURL}
                    maxHabitable={maxHabitable}
                    setMaxHabitable={setMaxHabitable}
                    setMaxHabitableURL={setMaxHabitableURL}
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