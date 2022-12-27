import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: []
};

export const reducer = createSlice({
  name: 'eventstream',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    purgeEvents: (state) => {
      state.events = [];
    },
    addSampleEvent: (state, action) => {
      state.events.push({
        time: Date.now(),
        name: "sample",
        data: {
          attr1: "named",
          attr2: 10
        }
      });
    },
  },
});

export const { addEvent, addSampleEvent, purgeEvents } = reducer.actions;
export const selectEventStream = (state) => state.eventstream.events;

/**
 * Redux Store for EventStream Behaviors
 * @author Vorachet Jaroensawas
 * @returns Redux Store
 */
export default reducer.reducer;
