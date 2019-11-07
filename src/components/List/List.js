import React from "react";
import "./list.scss";


const List = ({loading, markersData, activeMarker, toggleActiveMarker, hoverMarker, toggleHoverMarker, hasError, maxTotalRooms, setMaxTotalRooms, setMaxHabitable}) => {	
	const test = (rooms) => {
		if(maxTotalRooms < rooms) {
			setMaxTotalRooms(Math.ceil(rooms/100)*100);
			setMaxHabitable(Math.ceil(rooms/100)*100);
		}
	}
	
	return(
		<div className="list-container">
			{ loading === true ? 
				<>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				</>
			: 
			markersData.map(marker => (
				<div 
					key={marker.id} 
					className={"list-item " + (activeMarker === marker.id ? "active" : "") + (hoverMarker === marker.id ? " hovered" : "")} 
					onClick={() => { toggleActiveMarker(marker.id)} }
					onMouseEnter={() => {toggleHoverMarker(marker.id)} }
					onMouseLeave={() => {toggleHoverMarker(0)} }
				>
					{test(marker.attributes.habitable_rooms)}
					{marker.attributes.name}
					<ul>
						<li>Local Authority: {marker.attributes.local_authority}</li>
						<li>Date submitted: {marker.attributes.date_submitted}</li>
						<li>GDV: £{marker.attributes.gross_development_value_pence/100}</li>
						<li>Construction Costs: £{marker.attributes.construction_costs_pence/100}</li>
						<li>Professional Fees: £{marker.attributes.professional_fees_pence/100}</li>
						<li>Marketing and letting Fees: £{marker.attributes.marketing_and_letting_pence/100}</li>
						<li>Finance: £{marker.attributes.finance_pence/100}</li>
						<li>Financial planning obligations: £{marker.attributes.financial_planning_obligations_pence/100}</li>
						<li>Developer Profit: £{marker.attributes.developer_profit_pence/100}</li>

						<li>Residual Land Value: £{marker.attributes.residual_land_value_pence/100}</li>
						<li>Benchmark Land Value: £{marker.attributes.benchmark_land_value_pence/100}</li>
						<li>Residential Units: {marker.attributes.residential_units}</li>
						<li>Habitable Rooms: {marker.attributes.habitable_rooms}</li>
						<li>Commercial Area: {marker.attributes.commercial_area_square_centimetres/100}m&sup2;</li>
					</ul>
				</div>        
			))}
			{ markersData.length === 0 && 
				<p>No results found</p>
			}
			{ hasError && 
				<p>Sorry there was an error fetching the results, please try again.</p>
			}
		</div>
	)
}

export default List;
