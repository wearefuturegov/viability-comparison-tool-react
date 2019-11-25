import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import DisplayMap from '../DisplayMap/DisplayMap'
import List from '../../components/List/List'
import FilterBar from '../../components/FilterBar'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

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

    // HERE TODO ******
    // TWO PROBLEMS:
    // 1 - clear buttons dont seem to be working properly in particular with max vars

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
    
    // GDV Filter variables
    const [minGDVURL, setMinGDVURL] = useQueryParam('min_gdv', NumberParam);
    const [maxGDVURL, setMaxGDVURL] = useQueryParam('max_gdv', NumberParam);
    const [minGDV, setMinGDV] = useState((minGDVURL ? minGDVURL : 0));
    const [maxGDV, setMaxGDV] = useState((maxGDVURL ? maxGDVURL : 0));    
    const [GDVIsFiltered, setGDVIsFiltered] = useState(false);
    const [maxTotalGDV, setMaxTotalGDV] = useState(0);

    // Stories Filter variables
    const [minStoriesURL, setMinStoriesURL] = useQueryParam('min_stories', NumberParam);
    const [maxStoriesURL, setMaxStoriesURL] = useQueryParam('max_stories', NumberParam);
    const [minStories, setMinStories] = useState((minStoriesURL ? minStoriesURL : 0));
    const [maxStories, setMaxStories] = useState((maxStoriesURL ? maxStoriesURL : 0));    
    const [StoriesIsFiltered, setStoriesIsFiltered] = useState(false);
    const [maxTotalStories, setMaxTotalStories] = useState(0);

    // Commercial vars
    const [commercialURL, setCommercialURL] = useQueryParam('commercial', StringParam);
    const [commercial, setCommercial] = useState((commercialURL ? (commercialURL === 'true' ? 'with' : 'without') : 'off'));
    
    
    
    
    // API CALL 
    const API = 'https://viability-comparison-api.herokuapp.com/viability_appraisals'
    const [filters, setFilters] = useState('?' 
    + 'min_habitable_rooms=' + (minHabitableURL ? minHabitableURL : '')
    + '&max_habitable_rooms=' + (maxHabitableURL ? maxHabitableURL : '')
    + '&min_residential_units=' + (minResidentialURL ? minResidentialURL : '') 
    + '&max_residential_units=' + (maxResidentialURL ? maxResidentialURL : '')
    + '&min_gdv=' + (minGDVURL ? minGDVURL : '')
    + '&max_gdv=' + (maxGDVURL ? maxGDVURL : '')
    + '&min_stories=' + (minStoriesURL ? minStoriesURL : '')
    + '&max_stories=' + (maxStoriesURL ? maxStoriesURL : '')
    + '&commercial=' + (commercialURL === true ? commercialURL : commercialURL === false ? commercialURL : 'off')
    );

    useEffect(() => {
        if(minHabitableURL || maxHabitableURL || minResidentialURL || maxResidentialURL || minGDVURL || maxGDVURL || minStoriesURL || maxStoriesURL) {
            fetchData(API, 
                filters,
                setViabilityData, 
                setLoading, 
                setErrors);
        } else {
            fetchData(API, filters, setViabilityData, setLoading, setErrors);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filters]);

    useEffect(() => {
		if (viabilityData.meta) {
			setMaxTotalHabitable(Math.ceil(viabilityData.meta.habitable_rooms_max/100)*100);
			setMaxHabitable(maxHabitableURL ? maxHabitableURL : Math.ceil(viabilityData.meta.habitable_rooms_max/100)*100)

			setMaxTotalResidential(Math.ceil(viabilityData.meta.residential_units_max/100)*100);
            setMaxResidential(maxResidentialURL ? maxResidentialURL : Math.ceil(viabilityData.meta.residential_units_max/100)*100);
            
            setMaxTotalGDV(Math.ceil(viabilityData.meta.gdv_pounds_max/1000)*1000);
            setMaxGDV(maxGDVURL ? maxGDVURL : (Math.ceil(viabilityData.meta.gdv_pounds_max/1000)*1000));

            setMaxTotalStories(Math.ceil(viabilityData.meta.stories_max/10)*10);
            setMaxStories(maxStoriesURL ? maxStoriesURL : Math.ceil(viabilityData.meta.stories_max/10)*10);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [viabilityData, setMaxTotalHabitable, setMaxTotalResidential, setMaxTotalGDV, setMaxTotalStories]);
    


    return(
        <>
            <FilterBar 
                toggleActiveMarker={toggleActiveMarker}
                setFilters={setFilters}
                loading={loading}

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

                //GDV filters
                GDVIsFiltered={GDVIsFiltered}
                setGDVIsFiltered={setGDVIsFiltered}
                minGDV={minGDV}
                setMinGDV={setMinGDV}
                minGDVURL={minGDVURL}
                setMinGDVURL={setMinGDVURL}
                maxTotalGDV={maxTotalGDV}
                maxGDV={maxGDV}
                setMaxGDV={setMaxGDV}
                maxGDVURL={maxGDVURL}
                setMaxGDVURL={setMaxGDVURL}

                //Stories filters
                StoriesIsFiltered={StoriesIsFiltered}
                setStoriesIsFiltered={setStoriesIsFiltered}
                minStories={minStories}
                setMinStories={setMinStories}
                minStoriesURL={minStoriesURL}
                setMinStoriesURL={setMinStoriesURL}
                maxTotalStories={maxTotalStories}
                maxStories={maxStories}
                setMaxStories={setMaxStories}
                maxStoriesURL={maxStoriesURL}
                setMaxStoriesURL={setMaxStoriesURL}

                //Commercial filters
                commercial={commercial}
                setCommercial={setCommercial}
                commercialURL={commercialURL}
                setCommercialURL={setCommercialURL}
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