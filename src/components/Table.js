import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((e) => {
              const { description } = e;
              const { tag } = e;
              const { method } = e;
              const { value } = e;
              const { currency } = e;
              const currencyUsed = e.exchangeRates[currency].name;
              const { ask } = e.exchangeRates[currency];
              const exchange = (Number(value) * Number(ask)).toFixed(2);

              return (
                <tr key={ e.id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyUsed}</td>
                  <td>{Number(ask).toFixed(2)}</td>
                  <td>{exchange}</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropType.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
