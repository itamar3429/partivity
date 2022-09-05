import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
	initialState: {
		show: false,
		showWide: true,
	},
	name: "NavBar",
	reducers: {
		open(state) {
			state.show = true;
		},
		toggle(state) {
			state.show = !state.show;
		},
		close(state) {
			state.show = false;
		},
		toggleWide(state) {
			state.showWide = !state.showWide;
		},
	},
});

export const { close, open, toggle, toggleWide } = navSlice.actions;

export default navSlice.reducer;
