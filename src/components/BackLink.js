import React, { Component } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const StyledBackLink = styled.a`
    font-size: 18px;
    margin: 0;
    color: #046F9E;
    span {
        margin-left: 5px;
        -webkit-transition: all linear 0.1s;
        -moz-transition: all linear 0.1s;
        -o-transition: all linear 0.1s;
        transition: all linear 0.1s;
    }
    &:hover {
        span {
            margin-left: 10px;
        }
    }
    svg {
        vertical-align: middle;
    }
`
const BackLinkContainer = styled.div`
    margin-top: 10px;
`

export class BackLink extends Component {

    render() {
        return (
            <BackLinkContainer>
                <StyledBackLink href="/">
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <span>Back</span>
                </StyledBackLink>
            </BackLinkContainer>
        )
    }
}

export default BackLink
