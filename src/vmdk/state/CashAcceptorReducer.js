import { createSlice } from '@reduxjs/toolkit';

const AVAILABLE_COINS = [1, 5, 10, 100];
function buildCoins() {
  const coins = {};
  AVAILABLE_COINS.map(ac => coins[ac] = 0)
  return coins;
}

const initialState = {
  availableCoins: AVAILABLE_COINS,
  total: 0,
  change: 0,
  coins: buildCoins()
};

export const reducer = createSlice({
  name: 'keypad',
  initialState,
  reducers: {
    addCoinType: (state, action) => {
      console.log("addCoinType", typeof action.payload, action.payload)
      if (state.availableCoins.includes(action.payload)) {
        console.log(action.payload + " is already exist")
        return;
      }
      else {
        state.availableCoins.push(action.payload);
      }
    },
    setCoinType: (state, action) => {
      state.availableCoins = action.payload.map(v => parseInt(v));
    },
    check: (state, action) => {
      const price = action.payload
      if (state.total < price) return;
      state.change = state.total - price;
      state.coins = {};
      state.total = 0;

    },
    addCoin: (state, action) => {
      if (state.calculated) return;
      if (!state.coins[action.payload]) state.coins[action.payload] = 1;
      else state.coins[action.payload] += 1;
      state.total += action.payload;
    },
    clearKeypad: (state) => {
      state.coins = {};
      state.total = 0;
      state.change = 0;
    },
  },
});

export const {
  check,
  addCoinType,
  setCoinType,
  addCoin,
  clearKeypad } = reducer.actions;
  
export const selectKeypadAvailableCoins = (state) => state.keypad.availableCoins;
export const selectKeypadCoins = (state) => state.keypad.coins;
export const selectKeypadTotal = (state) => state.keypad.total;
export const selectKeypadChange = (state) => state.keypad.change;

/**
 * Redux Store for Cash Acceptor Behaviors
 * @author Vorachet Jaroensawas
 * @returns Redux Store
 */
export default reducer.reducer;
