import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
        display: inline-block;
        vertical-align: middle;
    }
    a {
        color: #fff;
        text-decoration: none;
    }
    .myListButton {
        color: #046F9E;
        background-color: #fff;
        text-decoration: none;
        padding: 5px 7px;
        border: 1px solid #fff;
        border-radius: 3px;
        vertical-align: middle;
        position: absolute;
        right: 15px;
        top: 10px;
    }
`
const Header = ({myList}) => {
    return (
        <StyledHeader>
            <h1><a href="/" title="Go home">Viability Compare Tool</a></h1>
            { myList && 
            <>
                { myList.length > 0 ?
                    <Link to={"/comparison-list/"} className={"myListButton"}>View your comparison list</Link>
                :null}
            </>
            }
        </StyledHeader>
    )
}

export default Header
