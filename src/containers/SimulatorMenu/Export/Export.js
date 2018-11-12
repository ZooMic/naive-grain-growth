import React, { PureComponent, Fragment } from 'react';
import Button from 'muicss/lib/react/button';

import { Input } from '../../../components/Input';
import { getGlobalCanvas } from '../../../helpers/globalCanvas';
import { getGridData } from '../../../selectors/gridData';


class Export extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filename: 'nng-export',
    };
  }

  onExportToText = () => {
    const { filename: fn } = this.state;
    const gridData = getGridData();
    const filename = `${fn}.json`;
    const jsonString = JSON.stringify(gridData);
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
      state: { filename },
      onExportToText,
      onExportToImage,
      onFilenameChange,
    } = this;

    return (
      <Fragment>
        <Input label="File name" value={filename} onChange={onFilenameChange} isRequired/>
        <Button size="small" variant="raised" color="accent" onClick={onExportToText}>Text</Button>
        <Button size="small" variant="raised" color="accent" onClick={onExportToImage}>Image</Button>
      </Fragment>
    );
  }

}

export default Export;