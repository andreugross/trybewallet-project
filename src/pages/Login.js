import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isSaveButtonDisabled: true,
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => this.handleButtonDisabled(),
    );
  };

  handleButtonDisabled = () => {
    const { email, password } = this.state;
    const maxLength = 5;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    const validatePassword = password.length > maxLength;
    this.setState({ isSaveButtonDisabled: !(validateEmail && validatePassword) });
  };

  handleOnClick = () => {
    const { history, emailDispatch } = this.props;
    const { email } = this.state;
    emailDispatch(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, isSaveButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              id="email"
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              id="password"
              onChange={ this.handleOnChange }
            />
          </label>
          <div>
            <button
              type="button"
              name="submit-button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.handleOnClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (state) => dispatch(userAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
