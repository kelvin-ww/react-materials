import React from 'react';
import FormContext from './context';
import FormCore from './FormCore';

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { initialValues, rules, linkages, onSubmit } = props;
    this.store = new FormCore({ initialValues, rules, linkages, onSubmit });

    // 自定义 Field 布局
    if (props.renderField) {
      this.store.setRenderFieldLayout(props.renderField);
    }
  }

  onSubmit = event => this.store.submit(event);

  componentDidUpdate(prevProps) {
    const { initialValues } = this.props;
    if (prevProps.initialValues !== initialValues) {
      this.store.setValues(initialValues);
    }
  }

  render() {
    const { initialValues, onSubmit, children, rules, linkages, renderField, ...rest } = this.props;
    return (
      <FormContext.Provider value={this.store}>
        <form
          onSubmit={this.onSubmit}
          {...rest}
        >
          { typeof children === 'function'
            ? children(this.store)
            : children
          }
        </form>
      </FormContext.Provider>
    );
  }
}

export default Form;
