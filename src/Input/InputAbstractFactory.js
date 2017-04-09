import React, { Component } from 'react';
import TextFactoryLoader from './InputTextFactory';

class InputAbstractFactory extends Component {

  componentWillMount() {
    const componentLoader =
      typeToComponent(this.props.type); // eslint-disable-line no-use-before-define
    componentLoader().then((InputComponent) => {
      this.setState({ InputComponent });
    });
  }

  render() {
    const { InputComponent } = this.state;
    return (
      <div>
        {!(InputComponent in this.state) && <p>Loading, please wait !</p>}
        {InputComponent in this.state && <InputComponent />}
      </div>
    );
  }
}

const typeToComponent = (type) => {
  switch (type) {
  case InputAbstractFactory.TYPE.TEXT:
    return TextFactoryLoader;

  default:
    return null;
  }
};

InputAbstractFactory.TYPE = {
  TEXT: 'text',
  TEXT_AREA: 'textarea',
  COLOR: 'color',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  NUMBER: 'number',
  EMAIL: 'email',
  SEARCH: 'search',
  DATE: 'date',
  TIME: 'time',
};

/**
 * Custom PropType for type property
 * Type should be one of predefined values from InputAbstractFactory.TYPE
 * @param props
 * @param propName
 * @param componentName
 * @return {*}
 * @constructor
 */
const PropTypeInputType = (props, propName, componentName) => {
  const prop = props[propName];
  const availableValues =
    Object.keys(InputAbstractFactory.TYPE).map(key => InputAbstractFactory.TYPE[key]);

  return availableValues.indexOf(prop) === -1
    ? new Error(`'Invalid prop \`${propName}\` supplied to \`${componentName}\`. See reference for available types.'`)
    : null;
};

InputAbstractFactory.propTypes = {
  type: PropTypeInputType,
};

InputAbstractFactory.defaultProps = {
  type: InputAbstractFactory.TYPE.TEXT,
};

export default InputAbstractFactory;
