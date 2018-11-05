import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColorPicker from '../../components/ColorPicker';

import Button from 'muicss/lib/react/button';
import Switch from '../../components/Switch';
import Icon, { icons } from '../../components/Icon';
import { NumberInput, Input } from '../../components/Input';
import { setOperation, setCellSize, setGridSize, setRandomSeed, saveInclusions } from '../../actions/current-grid';
import { getCurrentGrid } from '../../selectors/current-grid';
import 'muicss/dist/css/mui.css';
// import './style.scss';
import { getGlobalCanvas } from '../../helpers/globalCanvas';
import startInclusions from '../../operations/inclusions';
//({ amount, radius, color, isPickingColor, isSquare }) => (

class Inclusions extends PureComponent {
  onPickerClose = () => {
    console.log("PICKER CLOSE");
  }

  onPickerChange = ({ hex }) => {
    console.log("PICKER CHANGE", hex);
  }

  onInputChange = (propName) => (eventValue) => {
    const value = Number(eventValue);
    this.props.updateInclusions({
      [propName]: value,
    });
  }

  render() {
    const {
      onPickerClose,
      onPickerChange,
      props: { isPickingColor, amount },
     } = this;
    return (
      <Fragment>
        <NumberInput label="Amount" value={amount} onChange={onInclusionsInput('amount')} isRequired isInteger min={1} max={maxRandomSeed} />
        <ColorPicker close="#000" isVisible={isPickingColor} onClose={onPickerClose} onChange={onPickerChange} />
      </Fragment>
    );
  }
}
  
    
      <NumberInput label={!isSquare ? 'Radius' : 'Diagonal'} value={radius} onChange={onInclusionsInput('radius')} isRequired isInteger min={1} max={maxRandomSeed} />
      <Switch checked={!isSquare} labelLeft="Square" labelRight="Circular" onChange={onInclusionsSwitchChanged} />
      <div className="color-picker" style={{background: color}} onClick={onColorPickerOpen} />
      <Button size="small" variant="raised" color="accent" onClick={onInclusionsApply}>Apply</Button>
    </div>
  </div>
);

SimulatorMenu.propTypes = {
  amount: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isPickingColor: PropTypes.bool.isRequired,
  isSquare: PropTypes.bool,
};

const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);