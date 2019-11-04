import React, { useState, Component } from 'react'
import { render } from 'react-dom';
import DisplayMap from '../DisplayMap/DisplayMap'
import List from '../../components/List/List'

const Home = ({}) => {
    const [activeElement, toggleActiveElement] = useState(0);
    const markersData = [
        { 
            id: 1,
            latLng: { lat: 51.528289, lng:  -0.015796 }, 
            title: "Jolles House",
            local_auth: "Tower Hamlets",
            date: "2017-12-01",
            gdv: 21722012,
            construction: 16534811,
            prof_fees: 198418,
            dev_profit: 1569466,
            residual_land_value: -555258,
            bench_land_value: 2240000,
            residential_units: 70,
            habitable_rooms: 209,
            commercial_area: 0
        },
        { 
            id: 2,
            latLng: { lat: 51.521457, lng:  -0.010233 }, 
            title: "Gillender Street",
            local_auth: "Tower Hamlets",
            date: "2018-03-16",
            gdv: 114658450,
            construction: 54011711,
            prof_fees: 7480619,
            dev_profit: 19732719,
            residual_land_value: -846152,
            bench_land_value: 7170000,
            residential_units: 307,
            habitable_rooms: 839,
            commercial_area: 1613
        },
        { 
            id: 3,
            latLng: { lat: 51.530986, lng:  -0.033363 }, 
            title: "Regency Court",
            local_auth: "Tower Hamlets",
            date: "2019-01-08",
            gdv: 27195577,
            construction: 22435542,
            prof_fees: 2692265,
            dev_profit: 543912,
            residual_land_value: -4751358,
            bench_land_value: 4900000,
            residential_units: 92,
            habitable_rooms: null,
            commercial_area: 0
        },
        { 
            id: 4,
            latLng: { lat: 51.533389, lng:  -0.057512 }, 
            title: "519-523 Cambridge Heath Rd",
            local_auth: "Tower Hamlets",
            date: "2019-01-08",
            gdv: 5380821,
            construction: 2408482,
            prof_fees: 240848,
            dev_profit: 780683,
            residual_land_value: 2061818,
            bench_land_value: 1271784,
            residential_units: 13,
            habitable_rooms: 22,
            commercial_area: 150
        }
    ];

    return(
        <div>
            <DisplayMap markersData={markersData} activeElement={activeElement} toggleActiveElement={toggleActiveElement} />
            
            <h3>All data:</h3>
            <List markersData={markersData} activeElement={activeElement} toggleActiveElement={toggleActiveElement} />
        </div>
    )
}

export default Home