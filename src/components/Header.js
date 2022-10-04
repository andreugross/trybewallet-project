import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  total = () => {
    const { expanses } = this.props;
    return expanses.reduce((acc, cur) => (acc + (Number(cur.value)
      * Number(cur.exchangeRates[cur.currency].ask))), 0).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">
          Olá,
          {' '}
          {email}
          {' '}
          !
        </h2>
        <h2 data-testid="total-field">
          { this.total() }
        </h2>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expanses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expanses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
