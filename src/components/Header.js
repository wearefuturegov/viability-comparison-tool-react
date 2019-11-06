import React, { Component } from 'react'
import styled from 'styled-components';

const StyledHeader = styled.div`
    width: 100%;
    background: #046F9E;
    height: 51px;
    z-index: 999;
`


export class Header extends Component {
    render() {
        return (
            <StyledHeader>{this.props.children}</StyledHeader>
        )
    }
}

export default Header
