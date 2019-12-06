import React, { Component } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
    border-radius: 3px;
    font-size: 18px;
    margin: 0;
    padding: 3px 10px 4px 10px;
    background: #fff;
    border: 2px solid #046F9E;

    &:hover {
        cursor: pointer;
        border: 2px solid #046F9E;
        background: #eee;
    }
    &:active {
        background: #cecece;
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #046F9E !important;
    }

    &.filterBtn {
        font-size: 15px;
        margin-right: 15px;
        padding: 3px 10px 4px 10px;

        &.clear {
            border-color: #909090;
        }
    }

    &.primary {
        border: 1px solid #046F9E;
        background: #046F9E;
        color: #fff;
        
        &:hover {
            background: #0a5c80;
        }
        &:active {
            background: #114c66;
            border: 1px solid #fff;
        }
    
        &.active {
            background: #046F9E;
            border-color: #046F9E;
        }
    }

    &.small {
        font-size: 12px;
        padding: 2px 5px 3px 5px;
        border-width: 1px;
    }

    &:disabled, &:disabled:hover {
        background: #eee;
        border: 2px solid #eee;
        color: #121212;
        cursor: no-drop;
    }
    a {
        color: #000;
        text-decoration: none;
    }
`


export class Button extends Component {
    render() {
        return (
            <StyledButton disabled={this.props.disabled} className={this.props.type} onClick={this.props.onClick}>{this.props.children}</StyledButton>
        )
    }
}

export default Button
