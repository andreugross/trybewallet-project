import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';
import mockData from './helpers/mockData';

const initalState = {
  currencies: [
    'USD',
    'CAD',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'EUR',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
    'DOGE,',
  ],
  expenses: {
    id: 0,
    value: '1',
    description: 'exemplo',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: mockData,
  },
};

describe('Testa a funcionalidade do componemte Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, initalState);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Testa se todas os campos aparecem na tela de carteira', () => {
    const description = screen.getByText(/descrição da despesa/i);
    const tag = screen.getByText(/categoria da despesa/i);
    const value = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
  });

  test('Testa se o email adicionado no login aparece na tela da carteira', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByText(/entrar/i);

    userEvent.type(emailInput, 'exemplo@exemplo.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterBtn);

    const emailWallet = screen.getByRole('heading', { name: /olá, exemplo@exemplo.com !/i });
    expect(emailWallet).toBeInTheDocument();
  });
  // auxilio do Arthur Debiasi para finalizar este test usando mock
  test('Testa o item adiconado nas despesas renderiza corretamente na Table', () => {
    const description = screen.getByText(/descrição da despesa/i);
    const value = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(description, 'exemplo');
    userEvent.type(value, '1');
    userEvent.click(addBtn);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('Testa se todas os campos aparecem na tela de carteira', () => {
    const total = screen.getByRole('heading', { name: /0.00/i });

    expect(total).toBeInTheDocument();
  });

  test('Testa se a moeda do total é "BRL"', () => {
    const currencyTotal = screen.getByRole('heading', { name: /brl/i });

    expect(currencyTotal).toBeInTheDocument();
  });
});
