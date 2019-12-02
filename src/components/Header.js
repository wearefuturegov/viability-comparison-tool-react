import React, { Component } from 'react'
import styled from 'styled-components';

const StyledHeader = styled.div`
    width: calc(100% - 15px);
    background: #046F9E;
    height: 51px;
    z-index: 999;
    padding-left: 15px;

    h1 {
        text-transform: uppercase;
        color: #fff;
        margin: 0;
        line-height: 51px;
        font-size: 18px;
        letter-spacing: 0.75px;
    }
`


export class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <h1>Viability Compare Tool</h1>
            </StyledHeader>
        )
    }
}

export default Header
