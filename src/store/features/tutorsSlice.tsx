import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TutorT = {
	id: number
	name: string
	surname: string
	tutor_specialization: string
	hourly_price: number
}

export type TutorsStateT = {
	tutors: TutorT[]
}

const initialState: TutorsStateT = {
	tutors: [],
}

export const tutorsSlice = createSlice({
	name: 'tutors',
	initialState,
	reducers: {
		setAllTutors: (state, action: PayloadAction<TutorT[]>) => {
			state.tutors = action.payload
		},
	},
})

export const { setAllTutors } = tutorsSlice.actions

export default tutorsSlice.reducer
