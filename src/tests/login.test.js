import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL = 'exemplo@exemplo.com';
const DATAEMAIL = 'email-input';
const DATAPSWD = 'password-input';

describe('Testa a funcionalidade da aplicação', () => {
  test('Testa se a tela de login tem a route "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se a tela de login tem o campo email, password e botão "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(DATAEMAIL);
    const passwordInput = screen.getByTestId(DATAPSWD);
    const enterBtn = screen.getByText(/entrar/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
  });

  test('Testa se o botão de entrar está habilitado/desabilitado com senha menor que 6 dígitos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(DATAEMAIL);
    const passwordInput = screen.getByTestId(DATAPSWD);
    const enterBtn = screen.getByText(/entrar/i);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '12345');
    expect(enterBtn).toBeDisabled();

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    expect(enterBtn).not.toBeDisabled();
  });

  test('Testa se após o login com sucesso tela carteira é exibida na rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(DATAEMAIL);
    const passwordInput = screen.getByTestId(DATAPSWD);
    const enterBtn = screen.getByText(/entrar/i);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
