import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'muicss/lib/react/button';

import 'muicss/dist/css/mui.css';
import './styles.scss';

import { getMain, setMainParameters } from '../../../reducers/main';
import caGrowth from '../logic/ca-growth';
import { setWorker, terminateWorker } from '../logic/worker-management';

function CellularAutomata({ setMain, ...props}) {

    const { caType } = props;

    const onTypeChanged = (type) => () => setMain({caType: type});
    const onRun = () => {
        console.log('RUN');
        terminateWorker();
        const worker = caGrowth({
            ...props,
            callback: (event) => {
                const { grid, finished } = event.data;
                if (finished) {
                    console.log('FINISHED!');
                    setMain({ grid, isGenerated: true});
                } else {
                    console.log("NOT YET");
                    setMain({ grid });
                }
            }
        });
        setWorker(worker);
    }

    const isNeuman = caType === 'neuman';
    const isMoore = caType === 'moore';
    const isMoore2 = caType === 'moore2';

    return (
        <div className='inputs-group'>
            <span className="label">CellularAutomata</span>
            <Button size="small" variant="rised" color="accent" onClick={onTypeChanged('neuman')} disabled={isNeuman}>Neuman</Button>
            <Button size="small" variant="rised" color="accent" onClick={onTypeChanged('moore')} disabled={isMoore}>Moore</Button>
            <Button size="small" variant="rised" color="accent" onClick={onTypeChanged('moore2')} disabled={isMoore2}>Moore2</Button>
            <span className="label">&zwnj;</span>
            <Button size="small" variant="rised" color="accent" onClick={onRun}>Run</Button>
        </div>
    );
}

CellularAutomata.propTypes = {
};

const mapStateToProps = (state) => ({
    ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
    setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CellularAutomata);