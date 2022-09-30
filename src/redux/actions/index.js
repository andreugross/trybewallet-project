export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const userAction = (payload) => ({
  type: USER_INFO,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET_INFO,
  payload,
});
