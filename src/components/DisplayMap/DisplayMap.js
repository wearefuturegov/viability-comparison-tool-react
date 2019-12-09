import React, { useEffect, useState } from "react";
import "./leaflet.css";
import "./map.scss";
import southwarkData from "./southwark.json";
import towerHamletsData from "./towerHamlets.json";
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import { divIcon } from 'leaflet';
import styled from 'styled-components';

const LoadingMap = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0,0,0, 0.4);
	z-index: 99999;
	position: absolute;
	color: #fff;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
	padding-top: 45%;
	cursor: default;
`

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

const developmentListIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon on_list"></div>`
});

const developmentListActiveIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon on_list active"></div>`
});



const DisplayMap = ({loading, markersData, activeMarker, toggleActiveMarker, hoverMarker, toggleHoverMarker, listArray}) => {
	const [position, setPosition] = useState([51.4955927,-0.0756637]);
	const [zoom, setZoom] = useState(13);
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
		<Map center={position} zoom={zoom}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<GeoJSON style={southwarkStyle} data={southwarkData}></GeoJSON>
			<GeoJSON style={towerHamletsStyle} data={towerHamletsData}></GeoJSON>
			{ loading !== true && markersData !== undefined ?
				markersData.map(marker => (
					<Marker 
						key={marker.id}
						icon={(activeMarker === marker.id ? (listArray.indexOf(marker.id) !== -1 ? developmentListActiveIcon : developmentActiveIcon) : (listArray.indexOf(marker.id) !== -1 ? developmentListIcon : (hoverMarker === marker.id ? developmentHoverIcon : developmentIcon)))} 
						position={[marker.attributes.latitude, marker.attributes.longitude]} 
						onClick={() => { toggleActiveMarker(marker.id)}}
						onMouseOver={() => { toggleHoverMarker(marker.id)} }
						onMouseOut={() => { toggleHoverMarker(0)} }
					>
					</Marker>
				))
			: 
				<LoadingMap>Loading...</LoadingMap>
			}
		</Map>
	)
}

export default DisplayMap;