import React from 'react';

class FocusedInput extends React.Component {

  constructor(props) {
    super(props);
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
      <input id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        autoComplete="off"
        onKeyPress={this.props.handleKey} />
    );
  }
}

FocusedInput.defaultProps = {
  id: 'input',
  type: 'number',
  name: 'input',
  placeholder: '',
  autoComplete: 'off',
  onKeyPress: () =>{}
};

export default FocusedInput;
