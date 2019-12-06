import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';

const StyledLoadingScreen = styled.div`
    font-size: 18px;
    padding-top: 100px;
    text-align: center;

    p {
        font-weight: 600;
        margin-top: 25px;
    }
`
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Loader = styled.div`
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #046F9E; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
    margin: 0 auto;
`
export class LoadingScreen extends Component {

    render() {
        return (
            <StyledLoadingScreen>
                <Loader />
                <p>Loading...</p>
            </StyledLoadingScreen>
        )
    }
}

export default LoadingScreen
