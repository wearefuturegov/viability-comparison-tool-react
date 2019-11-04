import React from "react";
import L from "leaflet";
import "./leaflet.css";
import "./map.scss";
import southwarkData from "./southwark.json";
import towerHamletsData from "./towerHamlets.json";
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

const style = {
  width: "70%",
  height: "100%",
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0"
};

const DisplayMap = ({markersData, activeElement, toggleActiveElement}) => {
	const position = [51.505, -0.09]
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
	  		
	return (
		<Map center={position} zoom={13}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<GeoJSON style={southwarkStyle} data={southwarkData}></GeoJSON>
			<GeoJSON style={towerHamletsStyle} data={towerHamletsData}></GeoJSON>
			{markersData.map(marker => (
				<Marker position={marker.latLng} onClick={() => { toggleActiveElement(marker.id)}}>
					{/* <Popup>
						{marker.title}
					</Popup> */}
				</Marker>
			))};
		</Map>
	)
}

export default DisplayMap;