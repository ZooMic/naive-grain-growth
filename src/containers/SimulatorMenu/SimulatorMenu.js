import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import { Input } from '../../components/Input';
import 'muicss/dist/css/mui.css';
import './style.scss';
import { getGlobalCanvas } from '../../helpers/globalCanvas';
import { neumannProcedure, mooreProcedure, clearGrid, moore2Procedure } from '../../operations/procedure';
import Inclusions from './Inclusions';
import GridData from './GridData';
import { getGridData } from '../../selectors/gridData';

class SimulatorMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'nng-export',
    };
  }

  onExportToText = () => {
    const { filename: fn } = this.state;
    const { grid } = this.props;
    const filename = `${fn}.json`;
    const jsonString = JSON.stringify(grid);
    const element = document.createElement('a');
    const blob = new Blob([jsonString], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    element.setAttribute('href', url);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onExportToImage = () => {
    const { filename } = this.state;
    const canvas = getGlobalCanvas();
    const img = canvas.toDataURL("image/png");

    const element = document.createElement('a');
    element.setAttribute('href', img);
    element.setAttribute('download', `${filename}.png`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onFilenameChange = (eventValue) => {
    this.setState({
      filename: eventValue,
    });
  }

  render() {
    const {
      state: {
        filename,
      },
      props: {
        initialized,
      },
      onExportToText,
      onExportToImage,
      onFilenameChange,
    } = this;

    return (
      <div className="simulator-menu">
        <div className="inputs-group">
          <span className="label">INCLUSIONS</span>
          <Inclusions />
        </div>
        <div className="inputs-group">
          <span className="label">GRID DATA</span>
          <GridData />
        </div>
        <div className="inputs-group">
          <span className="label">EXPORTS</span>
          <Input label="File name" value={filename} onChange={onFilenameChange} isRequired/>
          <Button size="small" variant="raised" color="accent" onClick={onExportToText}>Text</Button>
          <Button size="small" variant="raised" color="accent" onClick={onExportToImage}>Image</Button>
        </div>
        <div className="inputs-group">
          <span className="label">RUN</span>
          <Button size="small" variant="raised" color="accent" onClick={clearGrid}>Clear</Button>
          <Button size="small" variant="raised" color="accent" onClick={neumannProcedure} disabled={initialized}>Neumann</Button>
          <Button size="small" variant="raised" color="accent" onClick={mooreProcedure} disabled={initialized}>Moore</Button>
          <Button size="small" variant="raised" color="accent" onClick={moore2Procedure} disabled={initialized}>Moore2</Button>
        </div>
      </div>
    );
  }
}

SimulatorMenu.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string,
    ),
  ),
};

const mapStateToProps = (state) => {
  const { initialized } = getGridData(state);
  return { initialized };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);