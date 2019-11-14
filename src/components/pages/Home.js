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
    const [activeMarker, toggleActiveMarker] = useState(0);
    const [markersData, setMarkersData] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [hoverMarker, toggleHoverMarker] = useState(0);
    const [hasError, setErrors] =  useState(false)
    const API = 'https://viability-comparison-api.herokuapp.com/viability_appraisals'

    const [minHabitableURL, setMinHabitableURL] = useQueryParam('min_habitable_rooms', NumberParam);
    const [maxHabitableURL, setMaxHabitableURL] = useQueryParam('max_habitable_rooms', NumberParam);
    const [minHabitable, setMinHabitable] = useState((minHabitableURL ? minHabitableURL : 0));
    const [maxHabitable, setMaxHabitable] = useState((maxHabitableURL ? maxHabitableURL : 0));    
    const [habitableIsFiltered, setHabitableIsFiltered] = useState(false);
    const [maxTotalRooms, setMaxTotalRooms] = useState(0);

    const [filters, setFilters] = useState('?');

    useEffect(() => {
        fetchData(API, filters, setMarkersData, setLoading, setErrors)
    }, [filters]);

    return(
        <>
            <FilterBar 
                toggleActiveMarker={toggleActiveMarker}
                setFilters={setFilters}
                minHabitable={minHabitable}
                setMinHabitable={setMinHabitable}
                setMinHabitableURL={setMinHabitableURL}
                maxHabitable={maxHabitable}
                setMaxHabitableURL={setMaxHabitableURL}
                setMaxHabitable={setMaxHabitable}
                habitableIsFiltered={habitableIsFiltered}
                setHabitableIsFiltered={setHabitableIsFiltered}
                maxTotalRooms={maxTotalRooms}
                minHabitableURL={minHabitableURL}
                maxHabitableURL={maxHabitableURL}
            />
            <MapContainer>
                <List 
                    loading={loading} 
                    markersData={markersData} 
                    activeMarker={activeMarker} 
                    toggleActiveMarker={toggleActiveMarker} 
                    hoverMarker={hoverMarker} 
                    toggleHoverMarker={toggleHoverMarker}
                    hasError={hasError}
                    setHabitableIsFiltered={setHabitableIsFiltered}
                    maxTotalRooms={maxTotalRooms}
                    setMaxTotalRooms={setMaxTotalRooms}
                    maxHabitable={maxHabitable}
                    setMaxHabitable={setMaxHabitable}
                    minHabitableURL={minHabitableURL}
                    maxHabitableURL={maxHabitableURL}
                />

                <DisplayMap 
                    markersData={markersData} 
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

export const fetchData = async (API, filters, setMarkersData, setLoading, setErrors) => {
    setLoading(true);
    const res = await fetch(API + filters);
    res
        .json()
        .then(res => setMarkersData(res.data), setLoading(false))
        .catch(err => setErrors(err));
}