import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
  initialState: {
    className: "",
  },
  name: "Transition",
  reducers: {
    fadeOut(state) {
      state.className = "fade-out";
    },
    fadeIn(state) {
      state.className = "fade-in";
    },
  },
});

export const { fadeOut, fadeIn } = linkSlice.actions;

export default linkSlice.reducer;
