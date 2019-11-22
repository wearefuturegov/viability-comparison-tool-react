import React, { useState, useEffect } from 'react';
import './filter-styles.scss'
import styled from 'styled-components';
import Modal from 'react-modal';
import Button from './Button';

import HabitableModal from './modals/HabitableModal'
import ResidentialModal from './modals/ResidentialModal'
import GDVModal from './modals/GDVModal'
import StoriesModal from './modals/StoriesModal'

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
    maxGDVURL,

    minStories,
    setMinStories,
    setMinStoriesURL,
    maxStories,
    setMaxStoriesURL,
    setMaxStories,
    StoriesIsFiltered,
    setStoriesIsFiltered,
    maxTotalStories,
    minStoriesURL,
    maxStoriesURL
}) => {
    const [openModal, setOpenModal] =  useState(false);
    const [setupFilters, changeSetupFilters] =  useState(false);
    const [modalType, setModalType] =  useState('');

    const [habitableButtonText, setHabitableButtonText] = useState('Habitable rooms');
    const [residentialButtonText, setResidentialButtonText] = useState('Residential units');
    const [GDVButtonText, setGDVButtonText] = useState('GDV');
    const [StoriesButtonText, setStoriesButtonText] = useState('Stories');
    
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

        // STORIES FUNCTIONS
        if((maxStoriesURL === undefined && minStoriesURL === undefined) || (maxStoriesURL === maxTotalStories && minStoriesURL === 0)) {
            setStoriesIsFiltered(false);
        } else {
            if(maxStoriesURL !== maxTotalStories || minStoriesURL !== 0) {
                setStoriesIsFiltered(true);
                setMinStoriesURL(minStories);
                setMaxStoriesURL(maxStories);
            }
        }


        if( maxHabitableURL !== maxTotalHabitable || minHabitableURL !== 0 || 
            maxResidentialURL !== maxTotalResidential || minResidentialURL !== 0 ||
            maxGDVURL !== maxTotalGDV || minGDVURL !== 0 ||
            maxStoriesURL !== maxTotalStories || minStoriesURL !== 0
        ) {
            if (maxTotalResidential !== 0 || 
                maxTotalHabitable !== 0 ||
                maxTotalGDV !== 0 ||
                maxTotalStories !== 0
            ) {
                setFilters('?' 
                + 'min_habitable_rooms=' + minHabitable 
                + '&max_habitable_rooms=' + maxHabitable
                + '&min_residential_units=' + minResidential 
                + '&max_residential_units=' + maxResidential
                + '&min_gdv=' + minGDV 
                + '&max_gdv=' + maxGDV
                + '&min_stories=' + minStories 
                + '&max_stories=' + maxStories
                ) //add all other filters above here
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setupFilters]);



    useEffect(() => {
        function setupFilterText() {
            // habitable setup
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

            // residential setup
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

            // gdv setup
            if(GDVIsFiltered) {
                if (minGDV !== 0) {
                    if (maxGDV !== maxTotalGDV) {
                        setGDVButtonText((minGDV/1000000) + 'm - ' + (maxGDV/1000000) + 'm GDV');
                    } else {
                        setGDVButtonText((minGDV/1000000) + 'm+ GDV');
                    }
                } else {
                    if(maxTotalGDV === maxGDV) {
                        setGDVIsFiltered(false);
                        setGDVButtonText('GDV');
                    } else {
                        setGDVButtonText('Up to ' + (maxGDV/1000000) + 'm GDV');
                    }
                }
            } else {
                setGDVButtonText('GDV');
            }

            // stories setup
            if(StoriesIsFiltered) {
                if (minStories !== 0) {
                    if (maxStories !== maxTotalStories) {
                        setStoriesButtonText(minStories + ' - ' + maxStories + ' stories');
                    } else {
                        setStoriesButtonText(minStories + '+ stories');
                    }
                } else {
                    if(maxTotalStories === maxStories) {
                        setStoriesIsFiltered(false);
                        setStoriesButtonText('Stories');
                    } else {
                        setStoriesButtonText('Up to ' + maxStories + ' stories');
                    }
                }
            } else {
                setStoriesButtonText('Stories');
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
            case 'stories':
                return <StoriesModal 
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={closeFunction}
                    minStories={minStories}
                    setMinStories={setMinStories}
                    setMinStoriesURL={setMinStoriesURL}
                    maxStories={maxStories}
                    setMaxStories={setMaxStories}
                    setMaxStoriesURL={setMaxStoriesURL}
                    StoriesIsFiltered={StoriesIsFiltered}
                    setStoriesIsFiltered={setStoriesIsFiltered}
                    maxTotalStories={maxTotalStories}
                    setStoriesButtonText={setStoriesButtonText}
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
                <Button 
                    type={'filterBtn ' + (!StoriesIsFiltered ? '' : 'primary')} 
                    disabled={loading} 
                    onClick={() => handleOpenModal('stories')}>
                        {StoriesButtonText}
                </Button>
            </FilterContainer>
            <Modal className={modalType+"-modal"} isOpen={openModal} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={true} contentLabel="Number of habitable rooms filter">
                { chooseModal(modalType, handleCloseModal) }
            </Modal>
        </>
    )
}

export default FilterBar