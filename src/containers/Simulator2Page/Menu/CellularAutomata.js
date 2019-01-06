import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'muicss/lib/react/button';
import { NumberInput } from '../../../components/Input';

import 'muicss/dist/css/mui.css';
import './styles.scss';

import mcGrowth from '../logic/mc-growth';
import createGrid from '../logic/create-grid';
import createColors from '../logic/create-colors';

import { getMain, setMainParameters, defaultState } from '../../../reducers/main';
import { setWorker, terminateWorker } from '../logic/worker-management'

let worker = null;

function MonteCarlo({ size, isInitialized, setMain, colorsAmount, ...restProps }) {

    const onClear = () => {
        terminateWorker();
        setMain(defaultState);
    }

    const onInitialize = () => {
        terminateWorker();
        const grid = createGrid(size);
        const colors = createColors(colorsAmount);
        setMain({ isInitialized: true, grid, colors });
    }

    const onGridChanged = (event) => {
        const grid = event.data;
        setMain({ grid });
    }

    const onMcGrowth = () => {
        terminateWorker();
        const worker = mcGrowth({
            ...restProps,
            size,
            isInitialized,
            colorsAmount,
            callback: onGridChanged,
            callbackTime: 250,
        });
        setWorker(worker);
    }

    const onInputChange = (propName) => (eventValue) => {
        const value = Number(eventValue);
        setMain({
            [propName]: value,
        });
    }

    const { mcIterations } = restProps;

    return (
        <div className='inputs-group'>
            <span className="label">Monte Carlo</span>
            <NumberInput label="Number of steps" value={mcIterations} onChange={onInputChange('mcIterations')} isRequired isInteger min={1} max={Infinity} />
            <Button size="small" variant="rised" color="accent" onClick={onInitialize}>INITIALIZE</Button>
            <Button size="small" variant="rised" color="accent" onClick={onClear} disabled={!isInitialized}>CLEAR</Button>
            <Button size="small" variant="rised" color="accent" onClick={onMcGrowth} disabled={!isInitialized}>RUN</Button>
        </div>
    );
}

MonteCarlo.propTypes = {
};

const mapStateToProps = (state) => ({
    ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
    setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonteCarlo);