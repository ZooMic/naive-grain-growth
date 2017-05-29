import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MenuActions from '../actions/menu';
import Neighborhoods from './Neighborhoods';
import Randomizations from './Randomizations';
import Periodically from './Periodically';
import DisplayProperties from './DisplayProperties';
import Recrystallization from './Recrystallization';


class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="menu">
                <Neighborhoods />
                <Randomizations />
                <Periodically />
                <DisplayProperties />
                <Recrystallization />
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        manu: state.menu
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(MenuActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
