import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import "./list.scss";
import * as Scroll from 'react-scroll';
import Button from '../Button';

const List = ({
		loading, 
		markersData, 
		activeMarker, 
		toggleActiveMarker, 
		hoverMarker, 
		toggleHoverMarker, 
		hasError, 

		setMaxHabitable, 
		setMaxTotalHabitable, 
		setMaxResidential,
		setMaxTotalResidential
	}) => {	

	var scroller = Scroll.scroller;

	useEffect(() => {
		console.log(markersData);
		setMaxTotalHabitable(10000);
		setMaxHabitable(10000)

		setMaxTotalResidential(10000);
		setMaxResidential(10000);
	}, [markersData, setMaxTotalHabitable, setMaxTotalResidential]);

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
					<h3>{marker.attributes.name}</h3>
					<Link tabIndex="-1" to={"/viability_appraisals/"+marker.id}><Button>View viability apprasial</Button></Link>
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
