import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BEMHelper from 'react-bem-helper';

import Button from 'muicss/lib/react/button';

import ColorPicker from '../../../components/ColorPicker';
import Switch from '../../../components/Switch';
import { NumberInput } from '../../../components/Input';

import { changeColorsMap } from '../../../actions/gridData';
import { changeInclusionsParameters } from '../../../actions/inclusions';
import { getInclusionsData } from '../../../selectors/inclusions';

import startInclusions from '../../../operations/inclusions';

import './Inclusions.scss';

const bem = BEMHelper('Inclusions');

class Inclusions extends PureComponent {
  onPickerClose = () => {
    this.props.changeInclusionsParameters({
      isPickingColor: false,
    });
  }

  onPickerChange = ({ hex }) => {
    this.props.changeInclusionsParameters({
      color: hex,
    });
    this.props.changeColorsMap({ 0: hex });
  }

  onInputChange = (propName) => (eventValue) => {
    const value = Number(eventValue);
    this.props.changeInclusionsParameters({
      [propName]: value,
    });
  }

  onShapeChange = () => {
    const { isSquare } = this.props;
    this.props.changeInclusionsParameters({
      isSquare: !isSquare,
    });
  }

  // onClear = () => {
    // console.log('ON CLEAR');
  // }

  onApply = () => {
    startInclusions();
  }

  onOpenColorPicker = () => {
    this.props.changeInclusionsParameters({
      isPickingColor: true,
    });
  }

  render() {
    const {
      onPickerClose, onPickerChange, onInputChange, onShapeChange, onApply, onOpenColorPicker,
      props: { isPickingColor, amount, radius, isSquare, color },
     } = this;
    return (
      <Fragment>
        <NumberInput
          label="Amount"
          value={amount}
          onChange={onInputChange('amount')}
          isRequired
          isInteger
          min={1}
          max={Infinity} 
        />
        <NumberInput
          label={!isSquare ? 'Radius' : 'Diagonal'}
          value={radius}
          onChange={onInputChange('radius')}
          isRequired
          isInteger
          min={1}
          max={Infinity}
        />
        <Switch checked={!isSquare} labelLeft="Square" labelRight="Circular" onChange={onShapeChange} />
        <div>
          <Button size="small" variant="raised" color="accent" onClick={onOpenColorPicker}>
            <div {...bem('color-picker-btn')} style={{background: color}} />
          </Button>
        </div>
        <ColorPicker color="#000" isVisible={isPickingColor} onClose={onPickerClose} onChange={onPickerChange} />
        {/* <div><Button size="small" variant="raised" color="accent" onClick={onClear}>Clear</Button></div> */}
        <div><Button size="small" variant="raised" color="accent" onClick={onApply}>Apply</Button></div>
      </Fragment>
    );
  }
}

Inclusions.propTypes = {
  amount: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isPickingColor: PropTypes.bool.isRequired,
  isSquare: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...getInclusionsData(state),
})

const mapDispatchToProps = (dispatch) => ({
  changeInclusionsParameters: changeInclusionsParameters(dispatch),
  changeColorsMap: changeColorsMap(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inclusions);