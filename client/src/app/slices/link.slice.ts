import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const clearTransitionThunk = createAsyncThunk(
	"Transition/clear",
	async (ms: number): Promise<void> => {
		return new Promise((res) => {
			setTimeout(() => {
				res();
			}, ms);
		});
	}
);

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
		clearTransition(state) {
			state.className = "";
		},
	},
	extraReducers(builder) {
		builder.addCase(clearTransitionThunk.fulfilled, (state) => {
			state.className = "";
		});
	},
});

export const { fadeOut, fadeIn, clearTransition } = linkSlice.actions;

export default linkSlice.reducer;
