import getCurrencyConverter from '../../services/getCurrAPI';

const USER_INFO = 'USER_INFO';
const WALLET_INFO = 'WALLET_INFO';
const GET_CURR = 'GET_CURR';
const CURR_SUCCESS = 'CURR_SUCCESS';
const CURR_FAIL = 'CURR_FAIL';
const GET_EXPENSE = 'GET_EXPENSE';
const EXP_SUCCESS = 'EXP_SUCCESS';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

const userAction = (payload) => ({ type: USER_INFO, payload });

const walletAction = (payload) => ({ type: WALLET_INFO, payload });

const actCurrency = () => ({ type: GET_CURR });

const actGetCurrencySuccess = (payload) => ({ type: CURR_SUCCESS, payload });

const actCurrencyFail = () => ({ type: CURR_FAIL });

const actExpense = () => ({ type: GET_EXPENSE });

const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

const actGetExpenseSuccess = (expenses, payload) => ({
  type: EXP_SUCCESS,
  payload: {
    ...payload,
    exchangeRates: expenses,
  },
});

function fetchWithThunk() {
  return async (dispatch) => {
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

function fetchExpense(payload) {
  return async (dispatch) => {
    dispatch(actExpense());
    const expenses = await getCurrencyConverter();
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
  DELETE_EXPENSE,
  deleteExpense,
  userAction,
  walletAction,
  fetchWithThunk,
  fetchExpense,
};
