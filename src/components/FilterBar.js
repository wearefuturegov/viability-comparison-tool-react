import React, { useState, useEffect } from 'react';
import './filter-styles.scss'
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from './Button';

import HabitableModal from './modals/HabitableModal'
import ResidentialModal from './modals/ResidentialModal'
import GDVModal from './modals/GDVModal'

Modal.setAppElement('#root');

const FilterContainer = styled.div`
    width: calc(100% - 30px);
    border-bottom: 1px solid rgba(200, 200, 200, 0.8);
    padding: 9px 15px;
`
const FilterBar = ({
    toggleActiveMarker,
    setFilters,
    loading,

    minHabitable,
    setMinHabitable,
    setMinHabitableURL,
    maxHabitable,
    setMaxHabitableURL,
    setMaxHabitable,
    habitableIsFiltered,
    setHabitableIsFiltered,
    maxTotalHabitable,
    minHabitableURL,
    maxHabitableURL,

    minResidential,
    setMinResidential,
    setMinResidentialURL,
    maxResidential,
    setMaxResidentialURL,
    setMaxResidential,
    residentialIsFiltered,
    setResidentialIsFiltered,
    maxTotalResidential,
    minResidentialURL,
    maxResidentialURL,

    minGDV,
    setMinGDV,
    setMinGDVURL,
    maxGDV,
    setMaxGDVURL,
    setMaxGDV,
    GDVIsFiltered,
    setGDVIsFiltered,
    maxTotalGDV,
    minGDVURL,
    maxGDVURL
}) => {
    const [openModal, setOpenModal] =  useState(false);
    const [setupFilters, changeSetupFilters] =  useState(false);
    const [modalType, setModalType] =  useState('');

    const [habitableButtonText, setHabitableButtonText] = useState('Habitable rooms');
    const [residentialButtonText, setResidentialButtonText] = useState('Residential units');
    const [GDVButtonText, setGDVButtonText] = useState('GDV');
    
    useEffect(() => {
        // HABITABLE FUNCTIONS
        if((maxHabitableURL === undefined && minHabitableURL === undefined) || (maxHabitableURL === maxTotalHabitable && minHabitableURL === 0)) {
            setHabitableIsFiltered(false);
        } else {
            if(maxHabitableURL !== maxTotalHabitable || minHabitableURL !== 0) {
                setHabitableIsFiltered(true);
                setMinHabitableURL(minHabitable);
                setMaxHabitableURL(maxHabitable);
            }
        }

        // RESIDENTIAL FUNCTIONS
        if((maxResidentialURL === undefined && minResidentialURL === undefined) || (maxResidentialURL === maxTotalResidential && minResidentialURL === 0)) {
            setResidentialIsFiltered(false);
        } else {
            if(maxResidentialURL !== maxTotalResidential || minResidentialURL !== 0) {
                setResidentialIsFiltered(true);
                setMinResidentialURL(minResidential);
                setMaxResidentialURL(maxResidential);
            }
        }

        // RESIDENTIAL FUNCTIONS
        if((maxGDVURL === undefined && minGDVURL === undefined) || (maxGDVURL === maxTotalGDV && minGDVURL === 0)) {
            setGDVIsFiltered(false);
        } else {
            if(maxGDVURL !== maxTotalGDV || minGDVURL !== 0) {
                setGDVIsFiltered(true);
                setMinGDVURL(minGDV);
                setMaxGDVURL(maxGDV);
            }
        }


        if(maxHabitableURL !== maxTotalHabitable || minHabitableURL !== 0 || maxResidentialURL !== maxTotalResidential || minResidentialURL !== 0) {
            if (maxTotalResidential !== 0 || maxTotalHabitable !== 0) {
                setFilters('?' 
                + 'min_habitable_rooms=' + minHabitable 
                + '&max_habitable_rooms=' + maxHabitable
                + '&min_residential_units=' + minResidential 
                + '&max_residential_units=' + maxResidential
                + '&min_gdv=' + minGDV 
                + '&max_gdv=' + maxGDV
                ) //add all other filters above here
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setupFilters]);



    useEffect(() => {
        function setupFilterText() {
            if(habitableIsFiltered) {
                if (minHabitable !== 0) {
                    if (maxHabitable !== maxTotalHabitable) {
                        setHabitableButtonText(minHabitable + ' - ' + maxHabitable + ' habitable rooms');
                    } else {
                        setHabitableButtonText(minHabitable + '+ habitable rooms');
                    }
                } else {
                    if(maxTotalHabitable === maxHabitable) {
                        setHabitableIsFiltered(false);
                        setHabitableButtonText('Habitable rooms');
                    } else {
                        setHabitableButtonText('Up to ' + maxHabitable + ' habitable rooms');
                    }
                }
            } else {
                setHabitableButtonText('Habitable rooms');
            }

            if(residentialIsFiltered) {
                if (minResidential !== 0) {
                    if (maxResidential !== maxTotalResidential) {
                        setResidentialButtonText(minResidential + ' - ' + maxResidential + ' residential units');
                    } else {
                        setResidentialButtonText(minResidential + '+ residential units');
                    }
                } else {
                    if(maxTotalResidential === maxResidential) {
                        setResidentialIsFiltered(false);
                        setResidentialButtonText('Residential units');
                    } else {
                        setResidentialButtonText('Up to ' + maxResidential + ' residential units');
                    }
                }
            } else {
                setResidentialButtonText('Residential units');
            }
        }
        
        setupFilterText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [habitableIsFiltered, setupFilters, maxTotalHabitable, setHabitableIsFiltered, maxTotalResidential, setResidentialIsFiltered]);




    function handleOpenModal(type) {
        if(loading !== true) {
            setOpenModal(true);
            setModalType(type);
        }
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
                    maxTotalHabitable={maxTotalHabitable}
                    setHabitableButtonText={setHabitableButtonText}
                />;
            case 'residential':
                return <ResidentialModal 
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={closeFunction}
                    minResidential={minResidential}
                    setMinResidential={setMinResidential}
                    setMinResidentialURL={setMinResidentialURL}
                    maxResidential={maxResidential}
                    setMaxResidential={setMaxResidential}
                    setMaxResidentialURL={setMaxResidentialURL}
                    residentialIsFiltered={residentialIsFiltered}
                    setResidentialIsFiltered={setResidentialIsFiltered}
                    maxTotalResidential={maxTotalResidential}
                    setResidentialButtonText={setResidentialButtonText}
                />;
            case 'gdv':
                return <GDVModal 
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={closeFunction}
                    minGDV={minGDV}
                    setMinGDV={setMinGDV}
                    setMinGDVURL={setMinGDVURL}
                    maxGDV={maxGDV}
                    setMaxGDV={setMaxGDV}
                    setMaxGDVURL={setMaxGDVURL}
                    GDVIsFiltered={GDVIsFiltered}
                    setGDVIsFiltered={setGDVIsFiltered}
                    maxTotalGDV={maxTotalGDV}
                    setGDVButtonText={setGDVButtonText}
                />;
            default:
                return <p>this would be all filters</p>;
        }
    }

    return (
        <>
            <FilterContainer>
                <Button 
                    type={'filterBtn ' + (!habitableIsFiltered ? '' : 'primary')} 
                    disabled={loading} 
                    onClick={() => handleOpenModal('habitable')}>
                        {habitableButtonText}
                </Button>
                <Button 
                    type={'filterBtn ' + (!residentialIsFiltered ? '' : 'primary')} 
                    disabled={loading} 
                    onClick={() => handleOpenModal('residential')}>
                        {residentialButtonText}
                </Button>
                <Button 
                    type={'filterBtn ' + (!GDVIsFiltered ? '' : 'primary')} 
                    disabled={loading} 
                    onClick={() => handleOpenModal('gdv')}>
                        {GDVButtonText}
                </Button>
            </FilterContainer>
            <Modal isOpen={openModal} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={true} contentLabel="Number of habitable rooms filter">
                { chooseModal(modalType, handleCloseModal) }
            </Modal>
        </>
    )
}

export default FilterBar