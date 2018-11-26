import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';

import Switch from '../../../components/Switch';
import { Input } from '../../../components/Input';
import onCreateBoundaries from '../../../operations/boundaries/createBoundaries';

import { getGridData } from '../../../selectors/gridData';
import { setGridData } from '../../../actions/gridData';


class Boundary extends PureComponent {

    onBoundaryVisible = () => {
        const { boundaryVisible, boundaryGrid, tempGrid, grid } = this.props;

        this.props.setGridData({
            boundaryVisible: !boundaryVisible,
            grid: boundaryVisible ? tempGrid : boundaryGrid,
            initialized: false,
        });
    }

    onCreateBoundaries = () => {
        onCreateBoundaries();
    }

    render () {
        const {
            onCreateBoundaries, onBoundaryVisible,
            props: { boundaryVisible },
        } = this; 
        return (
            <Fragment>
                {/* <Input label="File name" value={filename} onChange={onFilenameChange} isRequired/> */}
                {/* <Button size="small" variant="raised" color="accent" onClick={onExportToText}>Text</Button> */}
                <Button size="small" variant="raised" color="accent" onClick={onCreateBoundaries}>Boundaries</Button>
                <Switch checked={boundaryVisible} labelLeft="Hidden" labelRight="Visible" onChange={onBoundaryVisible} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { boundaryVisible, boundaryGrid, tempGrid, grid } = getGridData(state);   
    return { boundaryVisible, boundaryGrid, tempGrid, grid };
}
  
const mapDispatchToProps = (dispatch) => ({
    setGridData: setGridData(dispatch),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Boundary);