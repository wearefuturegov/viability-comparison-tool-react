import React from "react";
import "./leaflet.css";
import "./map.scss";
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import { divIcon } from 'leaflet';

const developmentIcon = divIcon({
	className: 'icon_container',
	iconAnchor: [23, 23],
	popupAnchor: [0, -23],
	iconSize: [46, 46],
	html: `<div class="development-icon"></div>`
});

const boundaryStyle = {
	color: "#256f8a",
	weight: 2,
	opacity: 1,
	fillOpacity: 0.3
};

const SingleMap = ({lat, long, boundaries}) => {
	return (
		<Map center={[lat, long]} zoom={16} className="single-page-map">
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{console.log(boundaries)}
			{ boundaries ? 
				<>
					<GeoJSON style={boundaryStyle} data={boundaries}></GeoJSON>
				</>
			:
				<Marker 
					key={lat}
					icon={developmentIcon} 
					position={[lat, long]} 
				/>
			}

		</Map>
	)
}

export default SingleMap;

