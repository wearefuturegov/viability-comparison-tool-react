import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BackLink from '../BackLink'
import Header from '../Header';

const SingleViability = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
`

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
        <BackLink />
        <h1>Your comparison list</h1>
        { loading === true ? (
            <p>Loading...</p>
        ) : (
            <>
            {chosenDevelopments && 
                chosenDevelopments.map(appraisal => (
                    <p>test {appraisal.attributes.name}</p>
                ))
            }
            </>
        )
        }
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