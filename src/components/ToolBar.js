import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ToolBarActions from '../actions/tool-bar'



class ToolBar extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        let newObj = Object.assign( {}, this.props.toolBar );
        newObj[event.target.name] = !this.props.toolBar[event.target.name];
        this.props.actions.setToolBarProperties(newObj);
    }

    render() {
        return (
            <div className="tool-bar-panel">
                <button name="play" onClick={ this.handleChange.bind(this) } >
                    { this.props.toolBar.play ? 'Pause' : 'Play' }
                </button>
                <button name="clean" onClick={ this.handleChange.bind(this) } >
                    Clean
                </button>
                <button name="random" onClick={ this.handleChange.bind(this) } >
                    Random
                </button>
                <button name="init" onClick={ this.handleChange.bind(this) } >
                    Init
                </button>
                <button name="recrystallization" onClick={ this.handleChange.bind(this) } >
                    Recrystallization
                </button>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        toolBar: state.toolBar
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ToolBarActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
