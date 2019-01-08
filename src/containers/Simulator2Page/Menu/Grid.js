import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NumberInput } from '../../../components/Input';
import 'muicss/dist/css/mui.css';
import './styles.scss';

import Button from 'muicss/lib/react/button';
import createGrid from '../logic/create-grid';
import createColors from '../logic/create-colors';
import { getMain, setMainParameters, defaultState } from '../../../reducers/main';
import { terminateWorker} from '../logic/worker-management';


function Grid({ size, cellSize, setMain, colorsAmount, ...restProps }) {
    const onInputChange = (propName) => (eventValue) => {
        const value = Number(eventValue);
        const splitProps = propName.split('.');
        if (splitProps.length === 1) {
            setMain({
                [propName]: value,
            });
        } else if (splitProps[0] === 'size') {
            setMain({ size: {...size, [splitProps[1]]: value }});
        } else if (splitProps[0] === 'cellSize') {
            setMain({ cellSize: {...cellSize, [splitProps[1]]: value }});
        }
    }

    const onClear = () => {
        terminateWorker();
        setMain({
            grid: [],
            colors: [],
            colorsAmount: 10,
            size: { rows: 100, cols: 100 },
            cellSize: { width: 5, height: 5 },
            isInitialized: false,
            isGenerated: false,
            selection: [],
            isSelectionOn: false,
        });
    }

    const onInitialize = () => {
        terminateWorker();
        const grid = createGrid(size);
        const colors = createColors(colorsAmount);
        setMain({ isInitialized: true, grid, colors, isGenerated: false, currentStep: 0 });
    }

    return (
        <div className='inputs-group'>
            <span className="label">Grid parameters</span>
            <NumberInput label="Colors amount" value={colorsAmount} onChange={onInputChange('colorsAmount')} isRequired isInteger min={1} max={Infinity} />
            <span className="label">Grid size</span>
            <NumberInput label="Rows" value={size.rows} onChange={onInputChange('size.rows')} isRequired isInteger min={1} max={Infinity} />
            <NumberInput label="Columns" value={size.cols} onChange={onInputChange('size.cols')} isRequired isInteger min={1} max={Infinity} />
            <span className="label">Cell size</span>
            <NumberInput label="Width" value={cellSize.width} onChange={onInputChange('cellSize.width')} isRequired isInteger min={1} max={Infinity} />
            <NumberInput label="Height" value={cellSize.height} onChange={onInputChange('cellSize.height')} isRequired isInteger min={1} max={Infinity} />
            <span className="label">&zwnj;</span>
            <Button size="small" variant="rised" color="accent" onClick={onInitialize}>INITIALIZE</Button>
            <Button size="small" variant="rised" color="accent" onClick={onClear}>CLEAR</Button>
        </div>
    );
}

Grid.propTypes = {
};

const mapStateToProps = (state) => ({
    ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
    setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);