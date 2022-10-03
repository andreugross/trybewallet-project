import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWithThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    payment: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithThunk());
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, payment, tag, currency } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            id="value-input"
            onChange={ this.onHandleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency-input"
            onChange={ this.onHandleChange }
          >
            {currencies.map((e, i) => (<option key={ i } value={ e }>{ e }</option>))}
            {console.log(currencies)}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="payment"
            id="method-input"
            value={ payment }
            onChange={ this.onHandleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.onHandleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <textarea
            data-testid="description-input"
            name="description"
            id="description-input"
            value={ description }
            onChange={ this.onHandleChange }
          />
        </label>

        <button type="button">Adicionar Despesa</button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequire;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
