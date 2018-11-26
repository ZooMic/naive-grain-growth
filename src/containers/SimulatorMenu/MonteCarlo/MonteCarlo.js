import React, { PureComponent, Fragment } from 'react';

import Button from 'muicss/lib/react/button';
import startMonteCarlo from '../../../operations/monte-carlo';

class MonteCarlo extends PureComponent {
  onStart = () => {
    startMonteCarlo();
  }

  render() {
    const {
      onStart,
    } = this;
    return (
      <Fragment>
          <Button size="small" variant="rised" color="accent" onClick={onStart}>Start</Button>
      </Fragment>
    );
  }
}


export default MonteCarlo;