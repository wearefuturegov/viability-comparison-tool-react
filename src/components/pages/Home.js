import React, { Component } from 'react'
import { render } from 'react-dom';
import Map from '../../components/Map'

export default class Home extends Component {
    state = {
        markersData: [
            { latLng: { lat: 51.6, lng:  -0.09 }, title: 1 },
            { latLng: { lat: 51.505, lng:  -0.09 }, title: 2 }
        ]
    };

    
    render() {
        const { markersData } = this.state;
        return (
        <div>
            <Map markersData={markersData} />
            
            <ul>Markers data:
            {markersData.map(marker => (
                <li key={marker.title}>
                {marker.title},
                lat: {marker.latLng.lat},
                lng: {marker.latLng.lng},
                </li>
            ))}
            </ul>
        </div>
        );
    }
}
