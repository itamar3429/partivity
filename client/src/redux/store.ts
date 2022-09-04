import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import generalSlice from "./slices/general.slice";
import linkSlice from "./slices/link.slice";
import navSlice from "./slices/nav.slice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		transition: linkSlice,
		nav: navSlice,
		general: generalSlice,
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
