import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: "฿",
  imageSize: 60,
  brand: "Unamed brand",
  isOwnerMode: false,
  outOfStockWarning: 2,
  trayModelJSONViewOpened: false,
  dispenserJSONViewOpened: false,
  inventoryViewOpened: false,
  eventStreamViewOpened: false,
  trayModel: null
};

export const reducer = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    setTrayModel: (state, action) => {
      state.trayModel = action.payload;
    },
    setOwnerMode: (state, action) => {
      state.isOwnerMode = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setOutOfStockWarning: (state, action) => {
      state.outOfStockWarning = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setImageSize: (state, action) => {
      state.imageSize = action.payload;
    },
    setTrayModelJSONViewOpened: (state, action) => {
      state.trayModelJSONViewOpened = action.payload;
    },
    setDispenserJSONViewOpened: (state, action) => {
      state.dispenserJSONViewOpened = action.payload;
    },
    setInventoryViewOpened: (state, action) => {
      state.inventoryViewOpened = action.payload;
    },
    setEventStreamViewOpened: (state, action) => {
      state.eventStreamViewOpened = action.payload;
    },
  },
});

export const { 
  setTrayModel,
  setOwnerMode,
  setBrand,
  setCurrency,
  setImageSize,
  setOutOfStockWarning,
  setInventoryViewOpened,
  setEventStreamViewOpened,
  setTrayModelJSONViewOpened,
  setDispenserJSONViewOpened} = reducer.actions;
export const selectMachineTrayModel = (state) => state.machine.trayModel;
export const selectMachineIsOwnerMode = (state) => state.machine.isOwnerMode;
export const selectMachineCurrency = (state) => state.machine.currency;
export const selectMachineBrand = (state) => state.machine.brand;
export const selectMachineOutOfStockWarning = (state) => state.machine.outOfStockWarning;
export const selectMachineImageSize = (state) => state.machine.imageSize;
export const selectMachineTrayModelJSONViewOpened = (state) => state.machine.trayModelJSONViewOpened;
export const selectMachineDispenserJSONViewOpened = (state) => state.machine.dispenserJSONViewOpened;
export const selectMachineInventoryViewOpened = (state) => state.machine.inventoryViewOpened;
export const selectMachineEventStreamViewOpened = (state) => state.machine.eventStreamViewOpened;

/**
 * Redux Store for Machine Behaviors
 * @author Vorachet Jaroensawas
 * @returns Redux Store
 */
export default reducer.reducer;
