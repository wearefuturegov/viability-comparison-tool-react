import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import SingleMap from '../DisplayMap/SingleMap'
import Header from '../Header';
import ListButton from '../ListButton';
import LoadingScreen from '../LoadingScreen';

const SingleViability = styled.div`
    width: calc(100% - 30px);
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;

    h1 { 
        display: inline-block;
        margin-top: 15px;
    }
    button {
        float: right;
        margin-top: 25px;
        @media screen and (max-width: 600px) {
            float: none;
            display: block;
            margin-top: 0;
            margin-bottom: 25px;
            width: 100%;
        }
    }
    .single-page-map {
        margin-top: 50px;
        width: 100%;
        margin-bottom: 15px;
    }
    hr {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`

const Bold = styled.span`
    font-weight: 600;
`
const ViabilityDetails = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
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
                <LoadingScreen />
            ) : (
                <>
                {chosenDevelopment && 
                <>
                    <div>
                        <h1>{chosenDevelopment.attributes.name}</h1>
                        <ListButton myList={myList} setmyList={setmyList} id={chosenDevelopment.id} />
                    </div>

                    <ViabilityDetails>
                        <Bold>Local Authority:</Bold> {chosenDevelopment.attributes.local_authority}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Date submitted:</Bold> {chosenDevelopment.attributes.date_submitted}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Application reference:</Bold> {chosenDevelopment.attributes.application}
                    </ViabilityDetails>
                    
                    <hr/>
                    
                    <ViabilityDetails>
                        <Bold>Habitable rooms:</Bold> {chosenDevelopment.attributes.habitable_rooms}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Residential units:</Bold> {chosenDevelopment.attributes.residential_units}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Affordable housing:</Bold> {chosenDevelopment.attributes.affordable_housing_percentage}%
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Commercial Area:</Bold> {addCommas(chosenDevelopment.attributes.commercial_area_square_centimetres/100)}m&sup2;
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Developer profit <span>(% of GDV)</span>:</Bold> {chosenDevelopment.attributes.developer_profit_as_percentage_of_gdv}%
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Max number of storeys:</Bold> {chosenDevelopment.attributes.stories}
                    </ViabilityDetails>
                    
                    <hr/>

                    <ViabilityDetails>
                        <Bold>GDV:</Bold> £{addCommas(chosenDevelopment.attributes.gross_development_value_pence/100)}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Construction Costs:</Bold> £{addCommas(chosenDevelopment.attributes.construction_costs_pence/100)}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Professional Fees <span>(% of construction costs)</span>:</Bold> {chosenDevelopment.attributes.professional_fees_as_percentage_of_construction_costs}%
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Marketing and letting Fees <span>(% of construction costs)</span>:</Bold> {chosenDevelopment.attributes.marketing_and_letting_as_percentage_of_construction_costs}%
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Finance:</Bold> £{addCommas(chosenDevelopment.attributes.finance_pence/100)}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Finance rate:</Bold> 
                    </ViabilityDetails>
                    
                    <hr/>

                    <ViabilityDetails>
                        <Bold>Financial planning obligations:</Bold> £{addCommas(chosenDevelopment.attributes.financial_planning_obligations_pence/100)}
                    </ViabilityDetails>
                    
                    <hr/>

                    <ViabilityDetails>
                        <Bold>Residual Land Value:</Bold> £{addCommas(chosenDevelopment.attributes.residual_land_value_pence/100)}
                    </ViabilityDetails>
                    <ViabilityDetails>
                        <Bold>Benchmark Land Value:</Bold> £{addCommas(chosenDevelopment.attributes.benchmark_land_value_pence/100)}
                    </ViabilityDetails>

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