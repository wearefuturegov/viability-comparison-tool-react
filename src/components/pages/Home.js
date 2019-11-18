import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import DisplayMap from '../DisplayMap/DisplayMap'
import List from '../../components/List/List'
import FilterBar from '../../components/FilterBar'
import { useQueryParam, NumberParam } from 'use-query-params';

const MapContainer = styled.div`
    width: 100%;
    height: calc(100vh - 99px);
    position: absolute;
    bottom: 0;
`

const Home = () => {
    // Map & list variables
    const [activeMarker, toggleActiveMarker] = useState(0);
    const [viabilityData, setViabilityData] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [hoverMarker, toggleHoverMarker] = useState(0);
    const [hasError, setErrors] =  useState(false)
    const API = 'https://viability-comparison-api.herokuapp.com/viability_appraisals'
    const [filters, setFilters] = useState('?');
    
    useEffect(() => {
        fetchData(API, filters, setViabilityData, setLoading, setErrors);
    }, [filters]);


    // Habitable Filter variables
    const [minHabitableURL, setMinHabitableURL] = useQueryParam('min_habitable_rooms', NumberParam);
    const [maxHabitableURL, setMaxHabitableURL] = useQueryParam('max_habitable_rooms', NumberParam);
    const [minHabitable, setMinHabitable] = useState((minHabitableURL ? minHabitableURL : 0));
    const [maxHabitable, setMaxHabitable] = useState((maxHabitableURL ? maxHabitableURL : 0));    
    const [habitableIsFiltered, setHabitableIsFiltered] = useState(false);
    const [maxTotalHabitable, setMaxTotalHabitable] = useState(0);

    // Residential Filter variables
    const [minResidentialURL, setMinResidentialURL] = useQueryParam('min_residential_units', NumberParam);
    const [maxResidentialURL, setMaxResidentialURL] = useQueryParam('max_residential_units', NumberParam);
    const [minResidential, setMinResidential] = useState((minResidentialURL ? minResidentialURL : 0));
    const [maxResidential, setMaxResidential] = useState((maxResidentialURL ? maxResidentialURL : 0));    
    const [residentialIsFiltered, setResidentialIsFiltered] = useState(false);
    const [maxTotalResidential, setMaxTotalResidential] = useState(0);

    useEffect(() => {
		if (viabilityData.meta) {
			setMaxTotalHabitable(Math.ceil(viabilityData.meta.habitable_rooms_max/100)*100);
			setMaxHabitable(maxHabitableURL ? maxHabitableURL : Math.ceil(viabilityData.meta.habitable_rooms_max/100)*100)

			setMaxTotalResidential(Math.ceil(viabilityData.meta.residential_units_max/100)*100);
			setMaxResidential(maxResidentialURL ? maxResidentialURL : Math.ceil(viabilityData.meta.residential_units_max/100)*100);
		}
    }, [viabilityData, setMaxTotalHabitable, setMaxTotalResidential]);
    
    return(
        <>
            <FilterBar 
                toggleActiveMarker={toggleActiveMarker}
                setFilters={setFilters}

                // habitable filters
                habitableIsFiltered={habitableIsFiltered}
                setHabitableIsFiltered={setHabitableIsFiltered}
                minHabitable={minHabitable}
                setMinHabitable={setMinHabitable}
                minHabitableURL={minHabitableURL}
                setMinHabitableURL={setMinHabitableURL}
                maxTotalHabitable={maxTotalHabitable}
                maxHabitable={maxHabitable}
                setMaxHabitable={setMaxHabitable}
                maxHabitableURL={maxHabitableURL}
                setMaxHabitableURL={setMaxHabitableURL}

                //residential filters
                residentialIsFiltered={residentialIsFiltered}
                setResidentialIsFiltered={setResidentialIsFiltered}
                minResidential={minResidential}
                setMinResidential={setMinResidential}
                minResidentialURL={minResidentialURL}
                setMinResidentialURL={setMinResidentialURL}
                maxTotalResidential={maxTotalResidential}
                maxResidential={maxResidential}
                setMaxResidential={setMaxResidential}
                maxResidentialURL={maxResidentialURL}
                setMaxResidentialURL={setMaxResidentialURL}
            />
            <MapContainer>
                <List 
                    // map & list filters
                    loading={loading} 
                    markersData={viabilityData.data} 
                    activeMarker={activeMarker} 
                    toggleActiveMarker={toggleActiveMarker} 
                    hoverMarker={hoverMarker} 
                    toggleHoverMarker={toggleHoverMarker}
                    hasError={hasError}

                />

                <DisplayMap 
                    loading={loading}
                    markersData={viabilityData.data} 
                    activeMarker={activeMarker} 
                    toggleActiveMarker={toggleActiveMarker} 
                    hoverMarker={hoverMarker} 
                    toggleHoverMarker={toggleHoverMarker} 
                />
            </MapContainer>
        </>
    )
}

export default Home

export const fetchData = async (API, filters, setViabilityData, setLoading, setErrors) => {
    setLoading(true);
    const res = await fetch(API + filters);
    res
        .json()
        .then(res => setViabilityData(res), setLoading(false))
        .catch(err => setErrors(err));
}