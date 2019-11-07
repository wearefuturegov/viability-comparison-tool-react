import React, { Component } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
    border-radius: 3px;
    font-size: 18px;
    margin: 0;
    padding: 3px 10px 4px 10px;
    background: #fff;
    border: 1px solid rgba(200, 200, 200, 0.8);

    &:hover {
        cursor: pointer;
        border: 1px solid rgb(180, 180, 180);
    }
    &:active {
        background: #eee;
    }
    &:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #046F9E !important;
    }

    &.filterBtn {
        font-size: 15px;
        margin-right: 15px;
        padding: 3px 10px 4px 10px;
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
`


export class Button extends Component {
    render() {
        return (
            <StyledButton className={this.props.type} onClick={this.props.onClick}>{this.props.children}</StyledButton>
        )
    }
}

export default Button
