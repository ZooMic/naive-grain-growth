import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NeighborhoodsActions from '../actions/neighborhoods';
import * as neighborhoods from './Neighborhoods/neighborhoods-methods';



class Neighborhoods extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.setNeighborhoodType({
            neighborhoodType: 'von-neumann',
            neighborhoodMethod: neighborhoods.methods('von-neumann'),
        });
    }

    handleChange(event) {
        let neighborhoodType = event.target.value;
        this.props.actions.setNeighborhoodType({
            neighborhoodType,
            neighborhoodMethod: neighborhoods.methods(neighborhoodType),
        });
    }

    render() {
        return (
            <div className="input-panel">
                <label className="header">Neighborhoods</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="von-neumann"
                    checked={ this.props.neighborhoods.neighborhoodType === "von-neumann" }
                    className="radio"
                />
                <label>Von Neumann</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="moore"
                    checked={ this.props.neighborhoods.neighborhoodType === "moore" }
                    className="radio"
                />
                <label>Moore</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="hexagonal-left"
                    checked={ this.props.neighborhoods.neighborhoodType === "hexagonal-left" }
                    className="radio"
                />
                <label>Hexagonal left</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="hexagonal-right"
                    checked={ this.props.neighborhoods.neighborhoodType === "hexagonal-right" }
                    className="radio"
                />
                <label>Hexagonal right</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="hexagonal-random"
                    checked={ this.props.neighborhoods.neighborhoodType === "hexagonal-random" }
                    className="radio"
                />
                <label>Hexagonal random</label><br/>
                <input
                    type="radio"
                    name="neighborhoods"
                    onChange={ this.handleChange.bind(this) }
                    value="pentagonal-random"
                    checked={ this.props.neighborhoods.neighborhoodType === "pentagonal-random" }
                    className="radio"
                />
                <label>Pentagonal random</label>

            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        neighborhoods: state.neighborhoods
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(NeighborhoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Neighborhoods);
