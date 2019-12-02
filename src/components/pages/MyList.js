import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import Header from '../Header';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
`
const TableContainer = styled.div`
    width: 100%;
    overflow: auto;
    white-space: nowrap;
`
const ComparisonTableHead = styled.div`
    text-align: left;
    display: inline-block;
    position: relative;
`
const ComparisonList = styled.div`
    margin-left: 222px;
`
const ComparisonTable = styled.div`
    text-align: right;
    display: inline-block;
    margin-left: 5px;
    width: 175px;
`

const TableHead = styled.div`
    font-weight: 600;
    width: 100%;
    h3 {
        overflow: hidden;
        margin-bottom: 0;
        background: #E4E4E4;
        padding: 13px 5px;
        text-align: center;
        font-size: 16px;
    }
    &.fixed {
        background: #fff;
        position: absolute;
        top: 63px;
        left: 15px;
        width: auto;
        border-right: 1px solid #adadad;
    }
`
const TableRow = styled.div`
    padding: 8px 0;
    overflow: hidden;
    width: 100%;

    span {
        display: block;
        font-weight: 600;
        color: #5f5f5f;
    }
    &:nth-child(odd) {
        background: #F5F5F5;
    }
    &.invisible {
        display: none;
    }
    &.doubleHeight {
        height: 36px;
        line-height: 40px;
    }
    &.end {
        border-bottom: 1px solid #adadad;
        padding-bottom: 15px;
    }
    &.start {
        margin-top: 15px;
    }
`

function addCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const MyList = () => {
    const [chosenDevelopments, setChosenDevelopments] = useState();
    const [loading, setLoading] = useState(true);
    const [hasError, setErrors] =  useState(false);

    const [myList, setmyList] = useState(
        localStorage.getItem('my_comparison_list') || ''
	);

    useEffect(() => {
        fetchData("https://viability-comparison-api.herokuapp.com/viability_appraisals?id=", myList, setChosenDevelopments, setLoading, setErrors)
    }, []);

    return (
        <>
        <Header myList={null} />
        <Container>
            <BackLink />
            <h1>Your comparison list</h1>
            
            { loading === true ? (
                <p>Loading...</p>
            ) : (
            <TableContainer>
                <ComparisonTableHead>
                    <TableHead className="fixed">
                        <TableRow className="invisible"></TableRow>
                        <TableRow>Local Authority</TableRow>
                        <TableRow>Date submitted</TableRow>
                        <TableRow className="end">Application reference</TableRow>

                        <TableRow className="start">Habitable rooms</TableRow>
                        <TableRow>Residential units</TableRow>
                        <TableRow>Affordable housing</TableRow>
                        <TableRow>Commercial Area</TableRow>
                        <TableRow>Developer profit <span>(% of GDV)</span></TableRow>
                        <TableRow className="end">Max number of storeys</TableRow>

                        <TableRow className="start">GDV</TableRow>
                        <TableRow>Construction Costs</TableRow>
                        <TableRow>Professional Fees <span>(% of construction costs)</span></TableRow>
                        <TableRow>Marketing and letting Fees <span>(% of construction costs)</span></TableRow>
                        <TableRow>Finance</TableRow>
                        <TableRow className="end">Finance rate</TableRow>
                        
                        <TableRow className="start end">Financial planning obligations</TableRow>

                        <TableRow className="start">Residual Land Value</TableRow>
                        <TableRow>Benchmark Land Value</TableRow>
                    </TableHead>
                </ComparisonTableHead>

                <ComparisonList>
                    {chosenDevelopments && 
                        chosenDevelopments.map(appraisal => (
                            <ComparisonTable>
                                <TableHead>
                                    <h3>{appraisal.attributes.name}</h3>
                                </TableHead>
                                    <TableRow>{appraisal.attributes.local_authority}</TableRow>
                                    <TableRow>{ appraisal.attributes.date_submitted ? appraisal.attributes.date_submitted : 'No date recorded' }</TableRow>
                                    <TableRow className="end">{appraisal.attributes.application}</TableRow>

                                    <TableRow className="start">{appraisal.attributes.habitable_rooms}</TableRow>
                                    <TableRow>{appraisal.attributes.residential_units}</TableRow>
                                    <TableRow>{appraisal.attributes.affordable_housing_percentage}%</TableRow>
                                    <TableRow>{appraisal.attributes.commercial_area_square_centimetres/100}m&sup2;</TableRow>
                                    <TableRow className="doubleHeight">{appraisal.attributes.developer_profit_as_percentage_of_gdv}%</TableRow>
                                    <TableRow className="end">{appraisal.attributes.stories}</TableRow>

                                    <TableRow className="start">£{addCommas(appraisal.attributes.gross_development_value_pence/100)}</TableRow>
                                    <TableRow>£{addCommas(appraisal.attributes.construction_costs_pence/100)}</TableRow>
                                    <TableRow className="doubleHeight">{appraisal.attributes.professional_fees_as_percentage_of_construction_costs}%</TableRow>
                                    <TableRow className="doubleHeight">{appraisal.attributes.marketing_and_letting_as_percentage_of_construction_costs}%</TableRow>
                                    <TableRow>£{addCommas(appraisal.attributes.finance_pence/100)}</TableRow>
                                    <TableRow className="end">???</TableRow>

                                    <TableRow className="start end">£{addCommas(appraisal.attributes.financial_planning_obligations_pence/100)}</TableRow>

                                    <TableRow className="start">£{addCommas(appraisal.attributes.residual_land_value_pence/100)}</TableRow>
                                    <TableRow>£{addCommas(appraisal.attributes.benchmark_land_value_pence/100)}</TableRow>
                            </ComparisonTable>
                        ))
                    }
                </ComparisonList>
                </TableContainer>
            )
            }
        </Container>
        </>
   )
}

export default MyList


export const fetchData = async (API, filters, setViabilityData, setLoading, setErrors) => {
    setLoading(true);
    const res = await fetch(API + filters);
    res
        .json()
        .then(res => setViabilityData(res.data), setLoading(false))
        .catch(err => setErrors(err));
}