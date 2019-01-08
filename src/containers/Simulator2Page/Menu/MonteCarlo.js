import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'muicss/lib/react/button';
import Switch from '../../../components/Switch';
import { NumberInput } from '../../../components/Input';

import Select from '../../../components/Select';

import 'muicss/dist/css/mui.css';
import './styles.scss';

import mcSRX from '../logic/mc-srx';
import mcGrowth from '../logic/mc-growth';
import createGrid from '../logic/create-grid';
import createColors from '../logic/create-colors';

import { getMain, setMainParameters, defaultState } from '../../../reducers/main';
import { setWorker, terminateWorker} from '../logic/worker-management';

function MonteCarlo({ size, isInitialized,  setMain, colorsAmount, ...restProps }) {

    const { mcIterations, isHomogenous, isGenerated, nucleonsDistrType, nucleonsAmount, nucleonsIterations, operationId, currentStep } = restProps;

    const onGridChanged = (event) => {
        const { grid, currentStep, finished } = event.data;
        setMain({ grid, currentStep });

        if (finished) {
            setMain({
                isGenerated: true,
                operationId: operationId + 1,
            });
        }
    }

    const onMcGrowth = () => {
        terminateWorker();
        setMain({ isGenerated: false });
        const worker = mcGrowth({
            ...restProps,
            size,
            isInitialized,
            colorsAmount,
            callback: onGridChanged,
            callbackTime: 250,
            mcIterations,
        });
        setWorker(worker);
    }

    const onSrxResponed = (event) => {
        const { grid, colors } = event.data;
        setMain({ grid, colors });
    }

    const onSrxStart = () => {
        terminateWorker();
        const worker = mcSRX({
            ...restProps,
            size,
            callback: onSrxResponed,
            callbackTime: 3000,
        });
        setWorker(worker);
    }
    
    const onInputChange = (propName) => (eventValue) => {
        const value = Number(eventValue);
        setMain({ [propName]: value });
    }

    const onEnergyDistChange = () => {
        setMain({ isHomogenous: !isHomogenous })
    }

    const onNucleonsDistrTypeChange = (event) => {
        console.log(event.target.value);
        setMain({ nucleonsDistrType: event.target.value });
    }


    return (
        <div className='inputs-group'>
            <span className="label">Monte Carlo</span>
            <NumberInput label="Number of steps" value={mcIterations} onChange={onInputChange('mcIterations')} isRequired isInteger min={1} max={Infinity} />
            <Button size="small" variant="rised" color="accent" onClick={onMcGrowth} disabled={!isInitialized}>RUN</Button>
            <span className="label">{currentStep !== 0 ? `${Math.ceil(currentStep * 100 / mcIterations)} %` : ''}&zwnj;</span>
            {/* <span className="label">Nucleons distribution</span>
            <Select value={nucleonsDistrType} disabled={!isGenerated} onChange={onNucleonsDistrTypeChange}>
                <option value='constant-anywhere'>Constant - Anywhere</option>
                <option value='constant-boundary'>Constant - Boundary</option> 
                <option value='increasing-anywhere'>Increasing - Anywhere</option> 
                <option value='increasing-boundary'>Increasing - Boundary</option> 
                <option value='beginning-anywhere'>Beginning - Anywhere</option> 
                <option value='beginning-boundary'>Beginning - Boundary</option> 
            </Select>
            <NumberInput label="Amount" value={nucleonsAmount} onChange={onInputChange('nucleonsAmount')} isRequired isInteger min={1} max={Infinity} />
            <NumberInput label="Iterations" value={nucleonsIterations} onChange={onInputChange('nucleonsIterations')} isRequired isInteger min={1} max={nucleonsAmount} />
            <Button size="small" variant="rised" color="accent" onClick={onSrxStart} disabled={!isGenerated}>RUN SRX</Button> */}
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