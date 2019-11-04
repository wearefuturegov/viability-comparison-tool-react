import React, { useState, useEffect } from 'react'
import DisplayMap from '../DisplayMap/DisplayMap'
import List from '../../components/List/List'

const Home = () => {
    const [loading, setLoading] =  useState(true)
    const [activeMarker, toggleActiveMarker] = useState(0);
    const [hoverMarker, toggleHoverMarker] = useState(0);
    const [hasError, setErrors] =  useState(false)
    const [hasFetched, setFetched] =  useState(false)
    const [markersData, setMarkersData] = useState([]);
    const API = 'https://viability-comparison-api.herokuapp.com/viability_appraisals'


    async function fetchData() {
        const res = await fetch(API);
        res
            .json()
            .then(res => setMarkersData(res.data), setLoading(false))
            .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <DisplayMap markersData={markersData} activeMarker={activeMarker} toggleActiveMarker={toggleActiveMarker} hoverMarker={hoverMarker} toggleHoverMarker={toggleHoverMarker} />
            
            <h3>All data:</h3>
            <List loading={loading} markersData={markersData} activeMarker={activeMarker} toggleActiveMarker={toggleActiveMarker} hoverMarker={hoverMarker} toggleHoverMarker={toggleHoverMarker} />
        </div>
    )
}

export default Home