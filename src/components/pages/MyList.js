import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import Header from '../Header';

const Container = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
`
const TableContainer = styled.div`
    width: 100%;
    overflow: auto;
    white-space: nowrap;
`
const ComparisonTableHead = styled.table`
    text-align: left;
    display: inline-block;

    thead {
        span {
            display: block;
            font-weight: 600;
            color: #5f5f5f;
        }
    }
    tr {
        th {
            padding: 5px 0;
        }
        &:odd {
            background-color: #eee;
        }
    }
    
`
const ComparisonTable = styled.table`
    text-align: left;
    display: inline-block;
    margin-left: 3px;
    width: 175px;

    thead {
        background-color: #E4E4E4;
        width: 175px;
        text-align: center;
        th {
            padding: 8px 0;
        }
    }
    tbody {
        text-align: right;
        width: 175px;
        display: table;
    
    tr {
        td {
            padding: 5px 0;
            padding-right: 25px;
        }
        &:odd {
            background-color: #eee;
        }
    }
    .doubleHeight {
        height: 46px;
        line-height: 52px;
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
                    <thead>
                        <tr>
                            <th colspan="3">Local Authority</th>
                        </tr>
                        <tr>
                            <th colspan="3">Date submitted</th>
                        </tr>
                        <tr>
                            <th colspan="3">Application reference</th>
                        </tr>

                        <tr>
                            <th colspan="3">Habitable rooms</th>
                        </tr>
                        <tr>
                            <th colspan="3">Residential units</th>
                        </tr>
                        <tr>
                            <th colspan="3">Affordable housing</th>
                        </tr>
                        <tr>
                            <th colspan="3">Commercial Area</th>
                        </tr>
                        <tr>
                            <th colspan="3">Developer profit <span>(% of GDV)</span></th>
                        </tr>
                        <tr>
                            <th colspan="3">Max number of storeys</th>
                        </tr>

                        <tr>
                            <th colspan="3">GDV</th>
                        </tr>
                        <tr>
                            <th colspan="3">Construction Costs</th>
                        </tr>
                        <tr>
                            <th colspan="3">Professional Fees <span>(% of construction costs)</span></th>
                        </tr>
                        {/* <tr>
                            <th colspan="3">Marketing and letting Fees</th>
                        </tr> */}
                        <tr>
                            <th colspan="3">Marketing and letting Fees <span>(% of construction costs)</span></th>
                        </tr>
                        <tr>
                            <th colspan="3">Finance</th>
                        </tr>
                        <tr>
                            <th colspan="3">Finance rate</th>
                        </tr>
                        
                        <tr>
                            <th colspan="3">Financial planning obligations</th>
                        </tr>

                        <tr>
                            <th colspan="3">Residual Land Value</th>
                        </tr>
                        <tr>
                            <th colspan="3">Benchmark Land Value</th>
                        </tr>
                    </thead>
                </ComparisonTableHead>

                {chosenDevelopments && 
                    chosenDevelopments.map(appraisal => (
                        <ComparisonTable>
                            <thead>
                                <tr>
                                    <th>{appraisal.attributes.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>{appraisal.attributes.local_authority}</td></tr>
                                <tr><td>{appraisal.attributes.date_submitted}</td></tr>
                                <tr><td>{appraisal.attributes.application}</td></tr>

                                <tr><td>{appraisal.attributes.habitable_rooms}</td></tr>
                                <tr><td>{appraisal.attributes.residential_units}</td></tr>
                                <tr><td>{appraisal.attributes.affordable_housing_percentage}%</td></tr>
                                <tr><td>{appraisal.attributes.commercial_area_square_centimetres/100}m&sup2;</td></tr>
                                <tr className="doubleHeight"><td>{appraisal.attributes.developer_profit_as_percentage_of_gdv}%</td></tr>
                                <tr><td>{appraisal.attributes.stories}</td></tr>

                                <tr><td>£{addCommas(appraisal.attributes.gross_development_value_pence/100)}</td></tr>
                                <tr><td>£{addCommas(appraisal.attributes.construction_costs_pence/100)}</td></tr>
                                <tr className="doubleHeight"><td>{appraisal.attributes.professional_fees_as_percentage_of_construction_costs}%</td></tr>
                                <tr className="doubleHeight"><td>{appraisal.attributes.marketing_and_letting_as_percentage_of_construction_costs}%</td></tr>
                                <tr><td>£{addCommas(appraisal.attributes.finance_pence/100)}</td></tr>
                                <tr><td>???</td></tr>

                                <tr><td>£{addCommas(appraisal.attributes.financial_planning_obligations_pence/100)}</td></tr>

                                <tr><td>£{addCommas(appraisal.attributes.residual_land_value_pence/100)}</td></tr>
                                <tr><td>£{addCommas(appraisal.attributes.benchmark_land_value_pence/100)}</td></tr>
                            </tbody>
                        </ComparisonTable>
                    ))
                }
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