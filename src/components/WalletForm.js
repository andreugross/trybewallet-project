import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWithThunk, fetchExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithThunk());
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOnClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchExpense(this.state));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <form>

        <label htmlFor="description-input">
          Descrição da despesa
          <textarea
            data-testid="description-input"
            name="description"
            id="description-input"
            value={ description }
            onChange={ this.handleOnChange }
          />
        </label>

        <label htmlFor="tag-input">
          Categoria da despesa
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleOnChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="value-input">
          Valor
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            id="value-input"
            onChange={ this.handleOnChange }
          />
        </label>

        <label htmlFor="method-input">
          Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            id="method-input"
            value={ method }
            onChange={ this.handleOnChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="currency-input">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency-input"
            onChange={ this.handleOnChange }
          >
            {currencies.map((e, i) => (<option key={ i } value={ e }>{e}</option>))}
          </select>
        </label>

        <button type="button" onClick={ this.handleOnClick }>Adicionar Despesa</button>

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
