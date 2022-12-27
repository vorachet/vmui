// Reducers
import { configureStore } from '@reduxjs/toolkit';
import MachineReducer from './MachineReducer'
import InventoryReducer from './InventoryReducer'
import EventStreamReducer from './EventStreamReducer'
import CashAcceptorReducer from './CashAcceptorReducer'
import PickupReducer from './PickupReducer'

/**
 * The Main Redux Store
 * @author Vorachet Jaroensawas
 * @returns Singleton Redux Store
 */
export const Store = configureStore({
  reducer: {
    machine: MachineReducer,
    inventory: InventoryReducer,
    eventstream: EventStreamReducer,
    keypad: CashAcceptorReducer,
    pickup: PickupReducer,
  },
});
