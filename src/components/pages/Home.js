import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import DisplayMap from '../DisplayMap/DisplayMap'
import List from '../../components/List/List'
import FilterBar from '../../components/FilterBar'

const MapContainer = styled.div`
    width: 100%;
    height: calc(100vh - 99px);
    position: absolute;
    bottom: 0;
`


const Home = () => {
    const [loading, setLoading] =  useState(true)
    const [activeMarker, toggleActiveMarker] = useState(0);
    const [hoverMarker, toggleHoverMarker] = useState(0);
    const [hasError, setErrors] =  useState(false)
    const [markersData, setMarkersData] = useState([]);
    const API = 'https://viability-comparison-api.herokuapp.com/viability_appraisals'

    const [minHabitable, setMinHabitable] = useState(0);
    const [maxHabitable, setMaxHabitable] = useState(100000);
    const [habitableIsFiltered, setHabitableIsFiltered] = useState(false);
	const [maxTotalRooms, setMaxTotalRooms] = useState(0);

    const [filters, setFilters] = useState('?')

    useEffect(() => {
        fetchData(API, filters, setMarkersData, setLoading, setErrors)
    }, [filters]);

    return(
        <>
            <FilterBar 
                setFilters={setFilters}
                minHabitable={minHabitable}
                setMinHabitable={setMinHabitable}
                maxHabitable={maxHabitable}
                setMaxHabitable={setMaxHabitable}
                habitableIsFiltered={habitableIsFiltered}
                setHabitableIsFiltered={setHabitableIsFiltered}
                maxTotalRooms={maxTotalRooms}
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
                    maxTotalRooms={maxTotalRooms}
                    setMaxTotalRooms={setMaxTotalRooms}
                    setMaxHabitable={setMaxHabitable}
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