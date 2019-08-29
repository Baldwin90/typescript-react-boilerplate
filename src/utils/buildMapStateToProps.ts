import { filterObject } from './filterObject';

interface buildMapStateToPropsProps {
  propsShape: Object,
}

export function buildMapStateToProps({ propsShape }: buildMapStateToPropsProps) {
  return (state: Object) => filterObject({
    sourceObject: state,
    filter: propsShape,
  });
}

export default buildMapStateToProps;
