import { createSlice } from '@reduxjs/toolkit';

export interface EventState {
	id: string;
}

const initialState: EventState = {
	id: '',
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		getEvent: (state) => {
			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { getEvent } = eventSlice.actions;

export default eventSlice.reducer;
