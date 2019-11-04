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
			{marker.name}
			<ul>
				<li>Local Authority: {marker.local_authority}</li>
				<li>Date submitted: {marker.date_submitted}</li>
				<li>GDV: £{marker.gross_development_value_pence/100}</li>
				<li>Construction Costs: £{marker.construction_costs_pence/100}</li>
				<li>Professional Fees: £{marker.professional_fees_pence/100}</li>
				<li>Marketing and letting Fees: £{marker.marketing_and_letting_pence/100}</li>
				<li>Finance: £{marker.finance_pence/100}</li>
				<li>Financial planning obligations: £{marker.financial_planning_obligations_pence/100}</li>
				<li>Developer Profit: £{marker.developer_profit_pence/100}</li>

				<li>Residual Land Value: £{marker.residual_land_value_pence/100}</li>
				<li>Benchmark Land Value: £{marker.benchmark_land_value_pence/100}</li>
				<li>Residential Units: {marker.residential_units}</li>
				<li>Habitable Rooms: {marker.habitable_rooms}</li>
				<li>Commercial Area: {marker.commercial_area_square_centimetres/100}m&sup2;</li>
			</ul>
			</div>        
		))}
		</div>
	)
}

export default List;
