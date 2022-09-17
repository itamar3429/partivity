import { createSlice } from "@reduxjs/toolkit";

type TAction<T> = {
	type: string;
	payload: T;
};

export type TRole = "client" | "provider" | "admin";

export type TUser = {
	username: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	role: TRole;
	connected: boolean;
	image: string;
};

export const generalSlice = createSlice({
	initialState: {
		page: "",
		user: { connected: false } as TUser,
		authenticated: false,
		lastAuth: new Date().toISOString(),
	},
	name: "General",
	reducers: {
		setPage(state, action: TAction<string>) {
			state.page = action.payload;
		},
		setUser(state, action: TAction<TUser>) {
			state.user = action.payload;
			state.authenticated = true;
			state.lastAuth = new Date().toISOString();
		},
		removeUser(state) {
			state.user = { connected: false } as TUser;
		},
	},
});

export const { setPage, setUser, removeUser } = generalSlice.actions;

export default generalSlice.reducer;
