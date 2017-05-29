import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RandomizationsActions from '../actions/randomizations';
import * as randomizations from './Randomizations/randomizations-methods';



class Randomizations extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.setRandomizationType({
            randomizationType: 'randomly',
            randomizationMethod: randomizations.methods('randomly'),
            radius: this.props.randomizations.radius,
            randomElementsNumber: this.props.randomizations.randomElementsNumber,
        });
    }

    handleChange(event) {
        let randomizationType = event.target.value;
        this.props.actions.setRandomizationType({
            randomizationType,
            randomizationMethod: randomizations.methods(randomizationType),
            radius: this.props.randomizations.radius,
            randomElementsNumber: this.props.randomizations.randomElementsNumber,
        });
    }

    handleRadiusChange(event) {
        let radius = Number(event.target.value);
        this.props.actions.setRandomizationType({
            randomizationType: this.props.randomizations.randomizationType,
            randomizationMethod: randomizations.methods(this.props.randomizations.randomizationType),
            radius,
            randomElementsNumber: this.props.randomizations.randomElementsNumber,
        })
    }


    handleRandomElementsNumberChange(event) {
        this.props.actions.setRandomElementsNumber(Number(event.target.value));
    }

    render() {
        return (
            <div className="input-panel">
                <label className="header">Randomizations</label><br/>
                <input
                    type="radio"
                    name="randomizations"
                    onChange={ this.handleChange.bind(this) }
                    value="randomly"
                    checked={ this.props.randomizations.randomizationType === "randomly" }
                    className="radio"
                />
                <label>Randomly</label><br/>
                <input
                    type="radio"
                    name="randomizations"
                    onChange={ this.handleChange.bind(this) }
                    value="evenly"
                    checked={ this.props.randomizations.randomizationType === "evenly" }
                    className="radio"
                />
                <label>Evenly</label><br/>
                <input
                    type="radio"
                    name="randomizations"
                    onChange={ this.handleChange.bind(this) }
                    value="with-radius"
                    checked={ this.props.randomizations.randomizationType === "with-radius" }
                    className="radio"
                />
                <label>With a radius</label><br/>
                <div className={ (this.props.randomizations.randomizationType !== "with-radius" ? 'unactive':'') + " text-input" } >
                    <label>Radius: </label>
                    <input
                        type="number"
                        value={ this.props.randomizations.radius }
                        disabled={ this.props.randomizations.randomizationType !== "with-radius" }
                        onChange={ this.handleRadiusChange.bind(this) }
                    />
                </div>
                <div className="individual-text-panel">
                    <label >Random elements: </label>
                    <input
                        type="number"
                        value={ this.props.randomizations.randomElementsNumber }
                        onChange={ this.handleRandomElementsNumberChange.bind(this) }
                        className="number"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        randomizations: state.randomizations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(RandomizationsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Randomizations);
