import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import SingleMap from '../DisplayMap/SingleMap'

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

    useEffect(() => {
        fetchData("https://viability-comparison-api.herokuapp.com/", window.location.pathname, setChosenDevelopment, setLoading, setErrors)
    }, []);
    
    return (
        <SingleViability>
            <BackLink />
            { loading === true ? (
                <p>Loading...</p>
            ) : (
                <>
                {chosenDevelopment && 
                <>
                    <h1>{chosenDevelopment.attributes.name}</h1>
                    <ul>
                        <li>Local Authority: {chosenDevelopment.attributes.local_authority}</li>
                        <li>Date submitted: {chosenDevelopment.attributes.date_submitted}</li>
                        <li>GDV: £{chosenDevelopment.attributes.gross_development_value_pence/100}</li>
                        <li>Construction Costs: £{chosenDevelopment.attributes.construction_costs_pence/100}</li>
                        <li>Storeys: {chosenDevelopment.attributes.stories}</li>
                        <li>Professional Fees: £{chosenDevelopment.attributes.professional_fees_pence/100}</li>
                        <li>Marketing and letting Fees: £{chosenDevelopment.attributes.marketing_and_letting_pence/100}</li>
                        <li>Finance (% of GDV): {chosenDevelopment.attributes.finance_as_percentage_of_gdv}%</li>
                        <li>Finance: £{chosenDevelopment.attributes.finance_pence/100}</li>
                        <li>Financial planning obligations: £{chosenDevelopment.attributes.financial_planning_obligations_pence/100}</li>
                       
                        <li>Developer Profit (% of GDV): {chosenDevelopment.attributes.developer_profit_as_percentage_of_gdv}%</li>
                        <li>Developer Profit: £{chosenDevelopment.attributes.developer_profit_pence/100}</li>
                        <li>Residual Land Value: £{chosenDevelopment.attributes.residual_land_value_pence/100}</li>
                        <li>Benchmark Land Value: £{chosenDevelopment.attributes.benchmark_land_value_pence/100}</li>
                        <li>Residential Units: {chosenDevelopment.attributes.residential_units}</li>
                        <li>Habitable Rooms: {chosenDevelopment.attributes.habitable_rooms}</li>
                        <li>Commercial Area: {chosenDevelopment.attributes.commercial_area_square_centimetres/100}m&sup2;</li>
                        <li>Affordable housing percentage: {chosenDevelopment.attributes.affordable_housing_percentage}%</li>
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