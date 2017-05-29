import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DisplayActions from '../actions/display';
import * as ToolBarActions from '../actions/tool-bar';
import { recrystallization } from './Display/recrystallization';


class Display extends Component {
    constructor(props) {
        super(props);
    }

    initialization() {
        let matrix = [];
        let lastId = 0;
        let colors = ['#000000'];
        let radialPoints = [];
        let activeCounter = 0;
        let edgeMatrix = [];
        for(let i = 0; i < this.props.state.displayProperties.elementsHeight; i++) {
            matrix.push([]);
            edgeMatrix.push([]);
            for(let j = 0; j < this.props.state.displayProperties.elementsWidth; j++) {
                matrix[i].push({
                    active: false,
                    id: lastId,
                    color: '#000000',
                    edge: false,
                });
                edgeMatrix[i].push({
                    active: false,
                    id: 0,
                    color: '#000000',
                    edge: false,
                });
            }
        }
        this.props.actions.updateDisplay({
            matrix,
            lastId,
            colors,
            radialPoints,
            activeCounter,
            edgeMatrix,
        });
        this.props.actions.setToolBarProperties({
            init:false,
            play: false,
            random: false,
            clean: false,
            recrystallization: false,
        });
    }

    drawCurrentState() {
        let matrix;
        if(this.props.state.recrystallization.draw) {
            matrix = this.props.state.display.edgeMatrix;
        } else {
            matrix = this.props.state.display.matrix;
        }

        let w = this.props.state.displayProperties.elementsWidth;
        let h = this.props.state.displayProperties.elementsHeight;
        if(matrix.length > 0 && matrix.length == h && matrix[0].length == w) {
            let width = this.props.state.displayProperties.displayWidth;
            let height = this.props.state.displayProperties.displayHeight;
            let canvas = document.getElementById('display-canvas');
            let ctx = canvas.getContext('2d');
            const elW = Math.floor(width / w);
            const elH = Math.floor(height / h);
            for(let i = 0; i < h; i++) {
                for(let j = 0; j < w; j++) {
                    ctx.fillStyle = matrix[i][j].color;
                    ctx.fillRect(j*elW, i*elH, elW, elH);
                }
            }
        }
    }

    componentDidMount() {
        this.initialization();
    }

    componentDidUpdate() {
        this.drawCurrentState();
        if(this.props.state.toolBar.init) {
            this.initialization();
        } else if(this.props.state.toolBar.random) {
            this.props.state.randomizations.randomizationMethod(this.props.state, this.props.actions);
        } else if(this.props.state.toolBar.clean) {
            this.initialization();
        } else if(this.props.state.toolBar.play) {
            this.props.state.neighborhoods.neighborhoodMethod(this.props.state, this.props.actions);
        } else if(this.props.state.toolBar.recrystallization) {
            recrystallization(this.props.state, this.props.actions);
        }
    }

    render() {
        return (
            <div id="display" >
                <canvas
                    id="display-canvas"
                    width={this.props.state.displayProperties.displayWidth}
                    height={this.props.state.displayProperties.displayHeight}
                >This browser does not suport canvas element </canvas>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateDisplay: DisplayActions.updateDisplay,
            setToolBarProperties: ToolBarActions.setToolBarProperties,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);