import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 

import BEMHelper from 'react-bem-helper';
import Button from 'muicss/lib/react/button';
import ColorPicker from '../../../components/ColorPicker';
import { getGrainsSelection } from '../../../selectors/grainsSelection';
import { changeGrainsSelectionParameters } from '../../../actions/grainsSelection';
import unift from '../../../operations/grainSelection/unify';
import cleanNotSelected from '../../../operations/grainSelection/cleanNotSelected';

import './GrainsSelection.scss';


const bem = BEMHelper('GrainsSelection');

class GrainsSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPickingColor: false,
    }
  }

  onOpenColorPicker = () => {
    this.setState({
      isPickingColor: true,
    });
  }

  onPickerClose = () => {
    this.setState({
      isPickingColor: false,
    });
  }

  onPickerChange = ({ hex }) => {
    this.props.changeGrainsSelectionParameters({
      unifyColor: hex,
    });
  }

  onStart = () => {
    this.props.changeGrainsSelectionParameters({
      isSelectingGrain: true,
    });
  }

  onStop = () => {
    this.props.changeGrainsSelectionParameters({
      isSelectingGrain: false,
    });
  }

  onUnify = () => {
    unift();
  }

  onApply = () => {
    cleanNotSelected();
  }

  render() {
    const {
      onOpenColorPicker, onPickerClose, onPickerChange,
      onStart, onStop, onUnify, onApply,
      props: { unifyColor, isSelectingGrain },
      state: { isPickingColor },
    } = this;

    return (
      <Fragment>
        { !isSelectingGrain ? <Button size="small" variant="raised" color="accent" onClick={onStart}>Start</Button> : null }
        { isSelectingGrain  ? <Button size="small" variant="raised" color="accent" onClick={onStop}>Stop</Button> : null }
        <div>
          <Button size="small" variant="raised" color="accent" onClick={onOpenColorPicker}>
            <div {...bem('color-picker-btn')} style={{background: unifyColor}} />
          </Button>
        </div>
        <ColorPicker {...bem('color-picker')} color="#000" isVisible={isPickingColor} onClose={onPickerClose} onChange={onPickerChange} />
        <Button size="small" variant="raised" color="accent" onClick={onUnify}>Unify</Button>
        <Button size="small" variant="raised" color="accent" onClick={onApply}>Apply</Button>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  const { unifyColor, isSelectingGrain, selectedGrains, isApplyed } = getGrainsSelection(state);
  return { unifyColor, isSelectingGrain, selectedGrains, isApplyed };
};

const mapDispatchToProps = (dispatch, prop) => ({
  changeGrainsSelectionParameters: changeGrainsSelectionParameters(dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(GrainsSelection);