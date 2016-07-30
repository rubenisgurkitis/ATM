import React from 'react';
import styles from './focusedInput.less';

class FocusedInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleBody = this.handleBody.bind(this);
  }

  componentDidMount() {
    document.getElementById(this.props.id).focus();
    document.body.addEventListener('click', this.handleBody);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBody);
  }

  handleBody(event) {
    event.preventDefault();
    document.getElementById(this.props.id).focus();
  }

  render() {
    return (
      <div id={this.props.id + 'Container'}
        className={styles.container}>
        <input id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          autoComplete="off"
          onKeyPress={this.props.handleKey} />
        <div className={styles.label}>
          <label>{this.props.errorMessage}</label>
        </div>
      </div>
    );
  }
}

FocusedInput.defaultProps = {
  id: 'input',
  type: 'number',
  name: 'input',
  placeholder: '',
  autoComplete: 'off',
  onKeyPress: () => {},
  errorMessage: 'Wrong value!'
};

export default FocusedInput;
