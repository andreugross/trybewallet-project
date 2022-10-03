import getCurrencyConverter from '../../services/getCurrAPI';

const USER_INFO = 'USER_INFO';
const WALLET_INFO = 'WALLET_INFO';
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

export const userAction = (payload) => ({
  type: USER_INFO,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET_INFO,
  payload,
});

export {
  USER_INFO,
  WALLET_INFO,
  CURR_SUCCESS,
  CURR_FAIL,
  fetchWithThunk,
};
