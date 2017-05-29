import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/app';
import Menu from './Menu';
import ToolBar from './ToolBar';
import Display from './Display';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.windowDidResize();
        window.addEventListener('resize', this.windowDidResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowDidResize.bind(this));
    }

    windowDidResize() {
        this.props.actions.setAppSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    render() {
        const divStyle = {
            height: this.props.app.height + 'px',
            width: this.props.app.width + 'px',
        }
        return (
            <div id="main-app" style={divStyle} >
                <Menu/>
                <ToolBar/>
                <Display />
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        app: state.app
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
