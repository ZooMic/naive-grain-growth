import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Switch from '../../../components/Switch';
import Button from 'muicss/lib/react/button';
import { NumberInput } from '../../../components/Input';

import 'muicss/dist/css/mui.css';
import './styles.scss';

import { getMain, setMainParameters } from '../../../reducers/main';
import energyDistribution from '../logic/energy-distribution';


function EnergyDistribution({ setMain, ...props}) {

    const { isHomogenous, isEnergyView, isGenerated, maxEnergy, minEnergy, avgEnergy } = props;

    const onEnergyDistChanged = () => setMain({ isHomogenous: !isHomogenous });
    const onViewChanged = () => setMain({ isEnergyView: !isEnergyView });
    const onInputChange = (propName) => (value) => setMain({[propName]: Number(value)});
    const onDistributeEnergy = () => {
        energyDistribution({
            ...props,
            callback: (event) => setMain({ grid: event.data.grid, isEnergyView: true }),
        });
    }

    return (
        <div className='inputs-group'>
            <span className="label">Energy distribution</span>
            <Switch checked={isHomogenous} labelLeft="Heterogenous" labelRight="Homogenous" onChange={onEnergyDistChanged}/>
            
            <span className="label">Energy</span>
            <NumberInput label="Minimum" value={minEnergy} onChange={onInputChange('minEnergy')} isRequired isInteger min={1} max={maxEnergy} disabled={isHomogenous}/>
            <NumberInput label="Maximum" value={maxEnergy} onChange={onInputChange('maxEnergy')} isRequired isInteger min={minEnergy} max={100} disabled={isHomogenous}/>
            <NumberInput label="Average" value={avgEnergy} onChange={onInputChange('avgEnergy')} isRequired isInteger min={1} max={100} disabled={!isHomogenous}/>

            <Button size="small" variant="rised" color="accent" onClick={onDistributeEnergy} disabled={!isGenerated}>Distribute</Button>
            <span className="label">View</span>
            <Switch checked={isEnergyView} labelLeft="Energy" labelRight="Default" onChange={onViewChanged}/>
        </div>
    );
}

EnergyDistribution.propTypes = {
};

const mapStateToProps = (state) => ({
    ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
    setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnergyDistribution);