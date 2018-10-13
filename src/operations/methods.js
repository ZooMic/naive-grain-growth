import neumann from './neumann';
import moore from './moore';

export default (methodName) => {
  switch(methodName) {
    case 'neumann': return neumann;
    case 'moore': return moore;
    default: return null;
  }
}