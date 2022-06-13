import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

type ErrorState = {
  entities: {
    [key: string]: string;
  };
};

const initialState: ErrorState = {
  entities: {}
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    errorOcurred: {
      reducer(state, action: PayloadAction<{ id: string; message: string }>) {
        const { id, message } = action.payload;
        state.entities[id] = message;
      },
      prepare(message: string) {
        return {
          payload: {
            id: uuidv4(),
            message
          }
        };
      }
    },
    errorDismissed(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.entities[id];
    }
  }
});

export const selectErrors = (state: RootState) =>
  Object.entries(state.errors.entities);

export const { errorOcurred, errorDismissed } = errorSlice.actions;

export default errorSlice.reducer;
