import React, { Component } from 'react'
import { render } from 'react-dom';
import Map from '../../components/Map'
import List from '../../components/List'

export default class Home extends Component {
    state = {
        markersData: [
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
                latLng: { lat: 51.533389, lng:  -0.057512 }, 
                title: "519-523 Cambridge Heath rd",
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
        ]
    };

    
    render() {
        const { markersData } = this.state;
        return (
        <div>
            <Map markersData={markersData} />
            
            <h3>All data:</h3>
            <List markersData={markersData} />
        </div>
        );
    }
}
