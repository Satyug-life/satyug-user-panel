import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  speed: "LOW",
  screen: "DESKTOP",
};

export const networkSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInternetSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setScreenSize: (state, { payload }) => {
      state.screen = payload;
    }
  },
});

export const { setInternetSpeed, setScreenSize } =
  networkSlice.actions;

export default networkSlice.reducer;
