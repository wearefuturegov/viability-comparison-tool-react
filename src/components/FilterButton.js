import React, { Component } from 'react'
import styled from 'styled-components';

const StyledFilterButton = styled.button`
    border: 1px solid rgba(200, 200, 200, 0.8);
    border-radius: 3px;
    font-size: 15px;
    margin: 0;
    margin-right: 15px;
    padding: 3px 10px 4px 10px;

    &:hover {
        cursor: pointer;
        border: 1px solid rgb(180, 180, 180);
    }
    &:active {
        background: rgb(225, 225, 225);
        border: 1px solid rgb(180, 180, 180);
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #046F9E !important;
    }
`


export class FilterButton extends Component {
    render() {
        return (
            <StyledFilterButton onClick={this.props.onClick}>{this.props.children}</StyledFilterButton>
        )
    }
}

export default FilterButton
