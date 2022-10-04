import getCurrencyConverter from '../../services/getCurrAPI';

const USER_INFO = 'USER_INFO';
const WALLET_INFO = 'WALLET_INFO';

function userAction(payload) {
  return { type: USER_INFO, payload };
}

function walletAction(payload) {
  return { type: WALLET_INFO, payload };
}

const GET_CURR = 'GET_CURR';
const CURR_SUCCESS = 'CURR_SUCCESS';
const CURR_FAIL = 'CURR_FAIL';

// VAI BUSCAR COISAS NA MINHA API
const actCurrency = () => ({ type: GET_CURR });

const actGetCurrencySuccess = (payload) => ({
  type: CURR_SUCCESS,
  payload,
});

const actCurrencyFail = () => ({
  type: CURR_FAIL,
});

// THUNK É UMA FUNÇÃO QUE RETORNA UMA OUTRA FUNÇÃO
function fetchWithThunk() {
  // RECEBE ALGUMAS COISAS COMO PARAMETRO
  return async (dispatch) => {
    // LOGICA
    dispatch(actCurrency());
    try {
      const currency = await getCurrencyConverter();
      // console.log(currency);
      delete currency.USDT;
      dispatch(actGetCurrencySuccess(currency));
    } catch (err) {
      dispatch(actCurrencyFail());
    }
  };
}
// -------------------------------------- //
const GET_EXPENSE = 'GET_EXPENSE';
const EXP_SUCCESS = 'EXP_SUCCESS';
// const EXP_FAIL = 'EXP_FAIL';

// VAI BUSCAR COISAS NA MINHA API
const actExpense = () => ({ type: GET_EXPENSE });

const actGetExpenseSuccess = (expenses, payload) => ({
  type: EXP_SUCCESS,
  payload: {
    ...payload,
    exchangeRates: expenses,
  },
});

/* const actExpenseFail = () => ({
  type: EXP_FAIL,
}); */

// THUNK É UMA FUNÇÃO QUE RETORNA UMA OUTRA FUNÇÃO
function fetchExpense(payload) {
  // RECEBE ALGUMAS COISAS COMO PARAMETRO
  return async (dispatch) => {
    // LOGICA
    dispatch(actExpense());
    const expenses = await getCurrencyConverter();
    // console.log(currency);
    delete expenses.USDT;
    dispatch(actGetExpenseSuccess(expenses, payload));
  };
}

export {
  USER_INFO,
  WALLET_INFO,
  CURR_SUCCESS,
  CURR_FAIL,
  EXP_SUCCESS,
  // EXP_FAIL,
  userAction,
  walletAction,
  fetchWithThunk,
  fetchExpense,
};
