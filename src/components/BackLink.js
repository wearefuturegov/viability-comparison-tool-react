import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

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
    margin-top: 15px;
`

export class BackLink extends Component {

    constructor(props){
        super(props);
     }

    render() {
        return (
            <BackLinkContainer>
                <StyledBackLink href="#" onClick={() => this.props.history.goBack()} title="Go back to the previous page">
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <span>Back</span>
                </StyledBackLink>
            </BackLinkContainer>
        )
    }
}

export default withRouter(BackLink)
