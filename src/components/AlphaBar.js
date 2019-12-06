import React from 'react';
import styled from 'styled-components';

const StyledAlphaBar = styled.div`
    width: calc(100% - 30px);
    background: #eee;
    padding: 9px 15px;
    position: fixed;
    bottom: 0;
    z-index: 99999;
    border-top: 1px solid #d6d6d6;
`
const AlphaBanner = styled.span`
    display: inline-block;
    outline: 2px solid transparent;
    outline-offset: -2px;
    color: #fff;
    background-color: #333;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 14px;
    line-height: 1;
    padding-top: 5px;
    padding-right: 8px;
    padding-bottom: 4px;
    padding-left: 8px;
    margin-right: 10px;
`

const AlphaBar = () => {
    return (
        <StyledAlphaBar>
            <AlphaBanner>ALPHA</AlphaBanner>
            Prototype tool for testing purposes only, supporting data not fully validated.
        </StyledAlphaBar>
    )
}

export default AlphaBar