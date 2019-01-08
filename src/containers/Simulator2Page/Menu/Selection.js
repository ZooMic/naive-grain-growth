import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'muicss/dist/css/mui.css';
import './styles.scss';

import Button from 'muicss/lib/react/button';
import { getMain, setMainParameters } from '../../../reducers/main';
import createColors from '../logic/create-colors';


function Selection({ isGenerated, isSelectionOn, selected, copied, setMain, colors, grid, size, ...restProps }) {

    const onStartStopSelection = () => {
        setMain({ isSelectionOn: !isSelectionOn });
    }

    const onCopy = () => {
        // set grains that fit to the selected id to the array
        const newCopied = [];
        const { rows, cols } = size;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let exist = false;
                for (let k = 0; k < selected.length; k++) {
                    if (selected[k].id === grid[i][j].color.id) {
                        exist = true;
                        break;
                    }
                }
                if (exist) {
                    newCopied.push({
                        x: i,
                        y: j,
                        object: grid[i][j],
                    });
                }
            }
        }
        // store this array in the state
        setMain({ copied: newCopied });
    }

    const onPaste = () => {
        // copied array apply to current grid with one new color
        const newColor = createColors(1)[0];
        
        copied.forEach(({x, y}) => {
            grid[x][y].color = {...newColor};
        });

        setMain({
            grid,
            colors: [...colors, newColor],
            copied: [],
            selected: [],
        });
        // save grid
        // save color
    }

    return (
        <div className='inputs-group'>
            <span className="label">Selection</span>
            <Button size="small" variant="rised" color="accent" onClick={onStartStopSelection} disabled={!isGenerated}>{isSelectionOn ? "OFF" : "ON"}</Button>
            <span className="label">{selected.length}</span>
            <Button size="small" variant="rised" color="accent" onClick={onCopy} disabled={selected.length === 0}>Copy</Button>
            <Button size="small" variant="rised" color="accent" onClick={onPaste} disabled={copied.length === 0}>Paste</Button>
        </div>
    );
}

Selection.propTypes = {
};

const mapStateToProps = (state) => ({
    ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
    setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);