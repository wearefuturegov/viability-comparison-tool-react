import React, { useEffect, useState } from "react";
import "./leaflet.css";
import "./map.scss";
import southwarkData from "./southwark.json";
import towerHamletsData from "./towerHamlets.json";
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import { divIcon } from 'leaflet';

const developmentIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon"></div>`
});

const developmentHoverIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon hovered"></div>`
});

const developmentActiveIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon active"></div>`
});

const DisplayMap = ({markersData, activeMarker, toggleActiveMarker, hoverMarker, toggleHoverMarker}) => {
	const [position, setPosition] = useState([51.505, -0.09]);
	const southwarkStyle = {
        color: "#256f8a",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
    };
    const towerHamletsStyle = {
        color: "#2e9e43",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
	};

	useEffect(() => {
		if(activeMarker !== 0) {
			const currentActive = markersData.find(e => e.id === activeMarker);
			setPosition([currentActive.attributes.latitude, currentActive.attributes.longitude]);
		}
    }, [activeMarker, markersData]);
	  		
	return (
		<Map center={position} zoom={13}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<GeoJSON style={southwarkStyle} data={southwarkData}></GeoJSON>
			<GeoJSON style={towerHamletsStyle} data={towerHamletsData}></GeoJSON>
			{markersData.map(marker => (
				<Marker 
					key={marker.id}
					icon={(activeMarker === marker.id ? developmentActiveIcon : (hoverMarker === marker.id ? developmentHoverIcon : developmentIcon))} 
					position={[marker.attributes.latitude, marker.attributes.longitude]} 
					onClick={() => { toggleActiveMarker(marker.id)}}
					onMouseOver={() => { toggleHoverMarker(marker.id)} }
					onMouseOut={() => { toggleHoverMarker(0)} }
				>
					
					{/* <Popup>
						{marker.attributes.name}
					</Popup> */}
				</Marker>
			))};
		</Map>
	)
}

export default DisplayMap;