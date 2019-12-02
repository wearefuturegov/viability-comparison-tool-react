import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import SingleMap from '../DisplayMap/SingleMap'
import Header from '../Header';
import ListButton from '../ListButton';

const SingleViability = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
`

const ViabilityAppraisal = () => {
    const [chosenDevelopment, setChosenDevelopment] = useState();
    const [loading, setLoading] = useState(true);
    const [hasError, setErrors] =  useState(false);

    const [myList, setmyList] = useState(
        localStorage.getItem('my_comparison_list') || ''
	);

	useEffect(() => {
        if (myList) {
            console.log('mylist = ' + myList)
            localStorage.setItem('my_comparison_list', myList);
        } else {
            localStorage.removeItem('my_comparison_list');
        }
    }, [myList]);


    useEffect(() => {
        fetchData("https://viability-comparison-api.herokuapp.com/", window.location.pathname, setChosenDevelopment, setLoading, setErrors)
    }, []);

    // TODO: Move this function somewhere so that it is accessible by list and in here to avoid duplication
    function addCommas(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
        <Header myList={myList} />
        <SingleViability>
            <BackLink />
            { loading === true ? (
                <p>Loading...</p>
            ) : (
                <>
                {chosenDevelopment && 
                <>
                    <h1>{chosenDevelopment.attributes.name}</h1>
                    <ListButton myList={myList} setmyList={setmyList} id={chosenDevelopment.id} />
                    <ul>
                        <li>Local Authority: {chosenDevelopment.attributes.local_authority}</li>
                        <li>Date submitted: {chosenDevelopment.attributes.date_submitted}</li>
                        <li>GDV: £{addCommas(chosenDevelopment.attributes.gross_development_value_pence/100)}</li>
                        <li>Construction Costs: £{addCommas(chosenDevelopment.attributes.construction_costs_pence/100)}</li>
                        <li>Max number of storeys: {chosenDevelopment.attributes.stories}</li>
                        <li>Professional Fees (% of construction costs): {chosenDevelopment.attributes.professional_fees_as_percentage_of_construction_costs}%</li>
                        <li>Marketing and letting Fees (% of construction costs): {chosenDevelopment.attributes.marketing_and_letting_as_percentage_of_construction_costs}%</li>
                        <li>Finance: £{addCommas(chosenDevelopment.attributes.finance_pence/100)}</li>
                        <li>Financial planning obligations: £{addCommas(chosenDevelopment.attributes.financial_planning_obligations_pence/100)}</li>
                       
                        <li>Developer Profit (% of GDV): {chosenDevelopment.attributes.developer_profit_as_percentage_of_gdv}%</li>
                        <li>Residual Land Value: £{addCommas(chosenDevelopment.attributes.residual_land_value_pence/100)}</li>
                        <li>Benchmark Land Value: £{addCommas(chosenDevelopment.attributes.benchmark_land_value_pence/100)}</li>
                        <li>Residential Units: {chosenDevelopment.attributes.residential_units}</li>
                        <li>Habitable Rooms: {chosenDevelopment.attributes.habitable_rooms}</li>
                        <li>Commercial Area: {addCommas(chosenDevelopment.attributes.commercial_area_square_centimetres/100)}m&sup2;</li>
                        <li>Affordable housing percentage: {chosenDevelopment.attributes.affordable_housing_percentage}%</li>
                        
                        <li>Application Reference: {chosenDevelopment.attributes.application}</li>
                    </ul> 
                    <SingleMap lat={chosenDevelopment.attributes.latitude} long={chosenDevelopment.attributes.longitude} boundaries={chosenDevelopment.attributes.boundary} />
                    </>
                }
                </>
            )}
            { hasError && 
				<p>Sorry there was an error fetching the results, please try again.</p>
			}
        </SingleViability>
        </>
    )
}

export default ViabilityAppraisal


export const fetchData = async (API, filters, setMarkersData, setLoading, setErrors) => {
    setLoading(true);
    const res = await fetch(API + filters);
    res
        .json()
        .then(res => setMarkersData(res.data), setLoading(false))
        .catch(err => setErrors(err));
}