import React, { Component } from 'react'
import styled from 'styled-components';

const StyledBackLink = styled.a`
    font-size: 18px;
    margin: 0;
`


export class BackLink extends Component {

    render() {
        return (
            <StyledBackLink href="/">Back</StyledBackLink>
        )
    }
}

export default BackLink
