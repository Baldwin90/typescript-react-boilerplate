import React from 'react';
import {
  // connect,
  useSelector,
  useDispatch,
} from 'react-redux';

import './ExampleComponent.scss';

import { exampleFunction } from '../../redux/actions';
// import { buildMapStateToProps } from '../../utils';

// interface ExampleComponentProps {
//   exampleVariable: String,
//   click: Function,
// }

// const ExampleComponent = ({ exampleVariable, click }: ExampleComponentProps) => {
const ExampleComponent = () => { // hooks
  const dispatch = useDispatch(); // hooks
  const exampleVariable = useSelector((state: any) => state.exampleVariable); // hooks

  return (
    <>
      <button
        type="button"
        className="example-component"
        // onClick={() => click('Example Payload')}
        onClick={() => dispatch(exampleFunction('Example Payload'))} // hooks
      >
        {`${exampleVariable} Component`}
      </button>
    </>
  );
};

export default ExampleComponent; // hooks

// const propsShape = {
//   exampleVariable: '',
// };

// export default connect(
//   buildMapStateToProps({ propsShape }),
//   { click: exampleFunction },
// )(ExampleComponent);