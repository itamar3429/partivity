import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import linkSlice from "./slices/link.slice";
import navSlice from "./slices/nav.slice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		transition: linkSlice,
		nav: navSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
