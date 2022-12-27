import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedSocket: null,
  dispenserDB: null,
};

export const reducer = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setSelectedSocket: (state, action) => {
      state.selectedSocket = action.payload;
    },
    setDispenserDB: (state, action) => {
      state.dispenserDB = action.payload;
    },
    deductInventory: (state, action) => {
      const key = action.payload;
      if (state.dispenserDB[key].qty === 0) return;
      state.dispenserDB[key].qty += -1;
    },
    refilInventory: (state, action) => {
      const key = action.payload;
      if (state.dispenserDB[key].qty >= state.dispenserDB[key].limit) return;
      state.dispenserDB[key].qty += 1;
    },
  },
});

export const { 
  setSelectedSocket,
  setDispenserDB,
  deductInventory,
  refilInventory } = reducer.actions;
export const selectInventoryDispenserDB = (state) => state.inventory.dispenserDB;
export const selectInventorySelectedSocket = (state) => state.inventory.selectedSocket;

/**
 * Redux Store for Inventory Behaviors
 * @author Vorachet Jaroensawas
 * @returns Redux Store
 */
export default reducer.reducer;
