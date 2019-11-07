import React, { Component } from 'react'
import styled from 'styled-components';

const StyledPrimaryButton = styled.button`
    border: 1px solid #046F9E;
    border-radius: 3px;
    font-size: 18px;
    margin: 0;
    padding: 3px 10px 4px 10px;
    background: #046F9E;
    color: #fff;

    &:hover {
        cursor: pointer;
        background: #0a5c80;
    }
    &:active {
        background: #114c66;
        border: 1px solid #fff;
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #046F9E !important;
    }

    &.active {
        background: #046F9E;
        border-color: #046F9E;
        color: #fff;
    }
`


export class PrimaryButton extends Component {
    render() {
        return (
            <StyledPrimaryButton onClick={this.props.onClick}>{this.props.children}</StyledPrimaryButton>
        )
    }
}

export default PrimaryButton
