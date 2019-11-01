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
    addMarker = () => {
        const { markersData } = this.state;
        const lastMarker = markersData[markersData.length - 1];

        this.setState({
        markersData: [
            ...markersData, {
                title: +lastMarker.title + 1,
                latLng: {
                    lat: lastMarker.latLng.lat + 0.0001,
                    lng: lastMarker.latLng.lng + 0.0001,
                }
            }
        ]
        });
    };
    render() {
        const { markersData } = this.state;
        return (
        <div>
            <Map markersData={markersData} />
            <button
            onClick={this.addMarker}
            >
            Add marker
            </button>
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
