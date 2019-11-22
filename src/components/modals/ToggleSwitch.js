import React, { Component } from 'react';
import styled from 'styled-components';

const Switch = styled.div`
    position: relative;
    height: 35px;
    width: 300px;
    background-color: #e4e4e4;
    border-radius: 3px;
`;

const SwitchRadio = styled.input`
    display: none;
`;

const SwitchSelection = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100px;
    height: 35px;
    background: #216BA5;
    border-radius: 3px;
    transition: left 0.25s ease-out;
`;

const SwitchLabel = styled.label`
    position: relative;
    z-index: 2;
    float: left;
    width: 100px;
    line-height: 35px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;

    ${SwitchRadio}:checked + &{
        transition: 0.15s ease-out;
        color: #fff;
    }
    
`;

const titleCase = str =>
    str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel = ({ title, onChange, id }) =>
    <SwitchLabel onClick={() => onChange(title)} className={id}>
        {titleCase(title)}
    </SwitchLabel>;

const ConcealedRadio = ({ value, selected }) =>
    <SwitchRadio type="radio" name="switch" checked={selected === value} onChange={() => console.log('commercial changed')} />;

class ToggleSwitch extends Component {
    state = { selected: this.props.selected };

    handleChange = val => {
        this.props.toggleActiveMarker(0);
        this.setState({ selected: val });
        this.props.setCommercial(val);
        this.props.setCommercialURL((val==='with' ? 'true' : val==='without' ? 'false' : ''));
    };

    selectionStyle = () => {
        return {
            left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
        };
    };

    render() {
        const { selected } = this.state;
        return (
        <Switch>
            {this.props.values.map(val => {
            return (
                <span key={val}>
                    <ConcealedRadio value={val} selected={selected} />
                    <ClickableLabel title={val} onChange={this.handleChange} />
                </span>
            );
            })}
            <SwitchSelection style={this.selectionStyle()} />
        </Switch>
        );
    } 
}

export default ToggleSwitch