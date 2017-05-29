import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DisplayPropertiesActions from '../actions/display-properties'


class DisplayProperties extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        let newObj = Object.assign({}, this.props.displayProperties );
        newObj[event.target.name] = Number(event.target.value);
        this.props.actions.setDisplayProperties( newObj );
    }

    render() {
        return (
            <div className="input-panel">
                <label>Display size: </label><br/>
                <div >
                    <label className="number" >Width: </label>
                    <input
                        type="number"
                        name="displayWidth"
                        value={ this.props.displayProperties.displayWidth }
                        onChange={ this.handleChange.bind(this) }
                        className="number"
                    />
                    <br/>
                    <label className="number" >Height: </label>
                    <input
                        type="number"
                        name="displayHeight"
                        value={ this.props.displayProperties.displayHeight }
                        onChange={ this.handleChange.bind(this) }
                        className="number"
                    />
                </div>
                <label>Elements size: </label><br/>
                <div >
                    <label className="number" >Width: </label>
                    <input
                        type="number"
                        name="elementsWidth"
                        value={ this.props.displayProperties.elementsWidth }
                        onChange={ this.handleChange.bind(this) }
                        className="number"
                    />
                    <br/>
                    <label className="number" >Height: </label>
                    <input
                        type="number"
                        name="elementsHeight"
                        value={ this.props.displayProperties.elementsHeight }
                        onChange={ this.handleChange.bind(this) }
                        className="number"
                    />
                </div>

            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        displayProperties: state.displayProperties
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(DisplayPropertiesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProperties);
