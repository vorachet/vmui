import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  change: 0,
  active: false,
  item: null,
};

export const reducer = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    setPickupExchange: (state, action) => {
      state.change = action.payload;
    },
    setPickupItem: (state, action) => {
      state.item = action.payload;
      state.active = true;
    },
    pickup: (state) => {
      state.change = 0;
      state.item = null;
      state.active = false;
    },
  },
});

export const { setPickupExchange, setPickupItem, pickup } = reducer.actions;
export const selectPickupExchange = (state) => state.pickup.change;
export const selectPickupItem = (state) => state.pickup.item;

/**
 * Redux Store for Pickup Behaviors
 * @author Vorachet Jaroensawas
 * @returns Redux Store
 */
export default reducer.reducer;
