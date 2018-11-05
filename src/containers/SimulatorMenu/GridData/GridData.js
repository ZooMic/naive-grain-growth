import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NumberInput } from '../../../components/Input';
import { changeCellSize, changeGridSize, changeRandomSeed, changeProbability } from '../../../actions/gridData';
import { getGridData } from '../../../selectors/gridData';

class GridData extends PureComponent {
  onGridSizeChanged = (propName) => (eventValue) => {
    const value = Number(eventValue);
    this.props.changeGridSize({
      [propName]: value,
    });
  }

  onCellSizeChanged = (propName) => (eventValue) => {
    const value = Number(eventValue);
    this.props.changeCellSize({
      [propName]: value,
    });
  }

  onRandomSeedChanged = (eventValue) => {
    this.props.changeRandomSeed(Number(eventValue));
  }

  onProbabilityChanged = (eventValue) => {
    this.props.changeProbability(Number(eventValue));
  }

  render() {
    const {
      onGridSizeChanged, onCellSizeChanged, onRandomSeedChanged, onProbabilityChanged,
      props: {
        gridSize: { row, col },
        cellSize: { width, height },
        randomSeed,
        maxRandomSeed,
        moore2Probability,
      },
    } = this;
    return (
      <Fragment>
        <NumberInput label="Grid rows" value={row} onChange={onGridSizeChanged('row')} isRequired isInteger min={10} max={500} />
        <NumberInput label="Grid columns" value={col} onChange={onGridSizeChanged('col')} isRequired isInteger min={10} max={500} />
        <br />
        <NumberInput label="Cell height" value={height} onChange={onCellSizeChanged('height')} isRequired isInteger min={1} max={20} />
        <NumberInput label="Cell width" value={width} onChange={onCellSizeChanged('width')} isRequired isInteger min={1} max={20} />
        <br />
        <NumberInput label="Random seed" value={randomSeed} onChange={onRandomSeedChanged} isRequired isInteger min={1} max={maxRandomSeed} />
        <NumberInput label="Moore 2 prob.[%]" value={moore2Probability} onChange={onProbabilityChanged} isRequired isInteger min={1} max={100} />
      </Fragment>
    );
  }
}

GridData.propTypes = {
  cellSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  gridSize: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }).isRequired,
  randomSeed: PropTypes.number.isRequired,
  maxRandomSeed: PropTypes.number.isRequired,
  moore2Probability: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { gridSize, cellSize, randomSeed, moore2Probability } = getGridData(state);
  const maxRandomSeed = gridSize.row * gridSize.col;
  return { gridSize, cellSize, randomSeed, maxRandomSeed, moore2Probability };
};

const mapDispatchToProps = (dispatch) => ({
  changeCellSize: changeCellSize(dispatch),
  changeGridSize: changeGridSize(dispatch),
  changeRandomSeed: changeRandomSeed(dispatch),
  changeProbability: changeProbability(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridData);