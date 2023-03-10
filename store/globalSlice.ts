import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Configuration } from "../types/Configuration.type";

export interface GlobalState {
  config: Configuration | undefined;
}
const initialState: GlobalState = {
  config: undefined,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setConfiguration: (state, action: PayloadAction<Configuration>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log("payload", action.payload);
      state.config = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConfiguration } = globalSlice.actions;

export default globalSlice.reducer;
