import React from "react";
import "./list.scss";


const List = ({markersData, activeMarker, toggleActiveMarker, hoverMarker, toggleHoverMarker}) => {
	return(
		<div className="list-container">
		{markersData.map(marker => (
			<div 
				key={marker.id} 
				className={"list-item " + (activeMarker === marker.id ? "active" : "") + (hoverMarker === marker.id ? " hovered" : "")} 
				onClick={() => { toggleActiveMarker(marker.id)} }
				onMouseEnter={() => {toggleHoverMarker(marker.id)} }
				onMouseLeave={() => {toggleHoverMarker(0)} }
			>
			{marker.title}
			<ul>
				<li>Local Authority: {marker.local_auth}</li>
				<li>Completion Date: {marker.date}</li>
				<li>GDV: £{marker.gdv}</li>
				<li>Construction Costs: £{marker.construction}</li>
				<li>Professional Fees: £{marker.prof_fees}</li>
				<li>Developer Profit: £{marker.dev_profit}</li>
				<li>Residual Land Value: £{marker.residual_land_value}</li>
				<li>Benchmark Land Value: £{marker.bench_land_value}</li>
				<li>Residential Units: {marker.residential_units}</li>
				<li>Habitable Rooms: {marker.habitable_rooms}</li>
				<li>Commercial Area: {marker.commercial_area}</li>
			</ul>
			</div>        
		))}
		</div>
	)
}

export default List;
