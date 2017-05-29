import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RecrystallizationActions from '../actions/recrystallization'



class Recrystallization extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        let parameter, draw;
        switch(event.target.name) {
            case "parameter":
                parameter = Number(event.target.value);
                draw = this.props.recrystallization.draw;
                break;
            case "draw":
                parameter = this.props.recrystallization.parameter;
                draw = !this.props.recrystallization.draw;
                break;
            default: break;
        }

        this.props.actions.setRecrystallization({
            parameter,
            draw
        });
    }

    render() {
        return (
            <div className="input-panel">
                <label className="header">Recrystallization: </label><br/>
                <div>
                    <label >Parameter: </label>
                    <input
                        type="number"
                        name="parameter"
                        value={ this.props.recrystallization.parameter }
                        onChange={ this.handleChange.bind(this) }
                        className="number"
                    />
                </div>
                <div>
                    <input
                        type="radio"
                        name="draw"
                        onChange={ this.handleChange.bind(this) }
                        checked={ this.props.recrystallization.draw }
                    />
                    <label>Draw edges </label>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        recrystallization: state.recrystallization
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(RecrystallizationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recrystallization);
