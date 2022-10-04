import { WALLET_INFO, CURR_SUCCESS, CURR_FAIL, EXP_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET_INFO:
    return {
      ...state,
      ...action.payload,
    };

  case CURR_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };

  case CURR_FAIL:
    return {
      ...state,
      error: action.err,
    };

  case EXP_SUCCESS:
    return { ...state, expenses: [...state.expenses, action.payload] };

  default:
    return state;
  }
}

export default wallet;
