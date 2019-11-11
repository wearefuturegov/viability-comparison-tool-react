import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import "./list.scss";
import * as Scroll from 'react-scroll';
import Button from '../Button';

const List = ({loading, markersData, activeMarker, toggleActiveMarker, hoverMarker, toggleHoverMarker, hasError, maxTotalRooms, setMaxTotalRooms, setMaxHabitable}) => {	
	var scroller = Scroll.scroller;

	const setBaseNumbers = (rooms) => {
		if(maxTotalRooms < rooms) {
			setMaxTotalRooms(Math.ceil(rooms/100)*100);
			setMaxHabitable(Math.ceil(rooms/100)*100);
		}
	}

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
			markersData.map(marker => (
				<li 
					key={marker.id} 
					name={'scroll'+marker.id}
					className={"list-item " + (activeMarker === marker.id ? "active" : "") + (hoverMarker === marker.id ? " hovered" : "")} 
					onClick={() => { toggleActiveMarker(marker.id)} }
					onMouseEnter={() => {toggleHoverMarker(marker.id)} }
					onMouseLeave={() => {toggleHoverMarker(0)} }
				>
					{setBaseNumbers(marker.attributes.habitable_rooms)}
					<h3>{marker.attributes.name}</h3>
					<Link to={"/viability_appraisals/"+marker.id}>View viability apprasial</Link>
					{/* <Button onClick={() => handleButtonClick(marker.id)}>View viability apprasial</Button> */}
				</li>        
			))}
			{ markersData.length === 0 && 
				<p>No results found</p>
			}
			{ hasError && 
				<p>Sorry there was an error fetching the results, please try again.</p>
			}
		</ul>
	)
}

export default List;
