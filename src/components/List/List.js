import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import "./list.scss";
import * as Scroll from 'react-scroll';

const List = ({
		loading, 
		markersData, 
		metaData,
		activeMarker, 
		toggleActiveMarker, 
		hoverMarker, 
		toggleHoverMarker, 
		hasError, 
	}) => {	

	var scroller = Scroll.scroller;

	useEffect(() => {
		if(activeMarker !== 0) {
			scroller.scrollTo('scroll'+activeMarker, {
				duration: 500,
				smooth: "linear",
				containerId: 'sidebar',
				offset: -50
			});
		}
	}, [activeMarker, scroller]);
	
	function addCommas(val) {
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	return(		
		<ul className="list-container" id="sidebar">
			{ loading === true ? 
				<>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				<div className="list-item card-loader card-loader--tabs"></div>
				</>
			: 
			markersData &&
				markersData.map(marker => (
					<li 
						key={marker.id} 
						name={'scroll'+marker.id}
						className={"list-item " + (activeMarker === marker.id ? "active" : "") + (hoverMarker === marker.id ? " hovered" : "")} 
						onClick={() => { toggleActiveMarker(marker.id)} }
						onMouseEnter={() => {toggleHoverMarker(marker.id)} }
						onMouseLeave={() => {toggleHoverMarker(0)} }
					>
						<h3>{marker.attributes.name}</h3>
						<div className="list-item__description">
							<p><span className="bold">Date submitted:</span> { marker.attributes.date_submitted ? marker.attributes.date_submitted : 'No date recorded' }</p>
							<p><span className="bold">Habitable rooms:</span> {addCommas(marker.attributes.habitable_rooms)}</p>
							<p><span className="bold">Residential units:</span> {addCommas(marker.attributes.residential_units)}</p>
							{ marker.attributes.commercial_area_square_centimetres ?
								<p><span className="bold">Commercial space:</span> {addCommas(marker.attributes.commercial_area_square_centimetres)}m&sup2;</p>
							:null}
							<p><span className="bold">Affordable housing:</span> {marker.attributes.affordable_housing_percentage}%</p>
              <p><span className="bold">Developer profit (% of GDV):</span> {marker.attributes.developer_profit_as_percentage_of_gdv}%</p>
							<p><span className="bold">Number of storeys:</span> {marker.attributes.stories}</p>
							<Link to={"/viability_appraisals/"+marker.id}>View all details</Link>
						</div>
					</li>        
				))
			}
			{ markersData ? 
				markersData.length === 0 && 
				<p>No results found</p>
			:null
			}
			{ hasError && 
				<p>Sorry there was an error fetching the results, please try again.</p>
			}
		</ul>
	)
}

export default List;
