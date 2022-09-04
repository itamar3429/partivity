import { createSlice } from "@reduxjs/toolkit";

type TAction<T> = {
	type: string;
	payload: T;
};

export const generalSlice = createSlice({
	initialState: {
		page: "",
	},
	name: "Transition",
	reducers: {
		setPage(state, action: TAction<string>) {
			state.page = action.payload;
		},
	},
});

export const { setPage } = generalSlice.actions;

export default generalSlice.reducer;
