import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    totalAmount: 0,
  };

  render() {
    const { email } = this.props;
    const { totalAmount } = this.state;
    return (
      <div>
        <h2 data-testid="email-field">
          Olá,
          {' '}
          { email }
          {' '}
          !
        </h2>
        <h2 data-testid="total-field">
          { totalAmount }
        </h2>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
