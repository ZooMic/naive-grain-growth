import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PeriodicallyActions from '../actions/periodically'



class Periodically extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.actions.setPeriodically(!this.props.periodically);
    }

    render() {
        return (
            <div className="input-panel">
                <input
                    type="radio"
                    name="periodically"
                    onChange={ this.handleChange.bind(this) }
                    checked={ this.props.periodically }
                />
                <label>Periodically</label>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        periodically: state.periodically
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PeriodicallyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Periodically);
