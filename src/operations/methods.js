import neumann from './neumann';
import moore from './moore';
import moore2 from './moore2';

export default (methodName) => {
  switch(methodName) {
    case 'neumann': return neumann;
    case 'moore': return moore;
    case 'moore2': return moore2;
    default: return null;
  }
}