import { TutorT, TutorsStateT } from '@/modules/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TutorsStateT = {
	allTutors: [],
	displayedTutors: [],
	sortBy: 'A-Z',
}

export const tutorsSlice = createSlice({
	name: 'tutors',
	initialState,
	reducers: {
		setAllTutors: (state, action: PayloadAction<TutorT[]>) => {
			state.allTutors = action.payload.slice().sort((tutorA, tutorB) => {
				if (tutorB.name > tutorA.name) return -1
				if (tutorB.name < tutorA.name) return 1
				return 0
			})
		},
		setDisplayedTutors: (state, action: PayloadAction<TutorT[]>) => {
			if (state.sortBy === 'A-Z') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => {
						if (tutorB.name > tutorA.name) return -1
						if (tutorB.name < tutorA.name) return 1
						return 0
					})
			}
			if (state.sortBy === 'Z-A') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => {
						if (tutorB.name < tutorA.name) return -1
						if (tutorB.name > tutorA.name) return 1
						return 0
					})
			}
			if (state.sortBy === 'most_available') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => tutorA.hasLessons - tutorB.hasLessons)
			}
			if (state.sortBy === 'least_available') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => tutorB.hasLessons - tutorA.hasLessons)
			}
			if (state.sortBy === 'cheapest') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => tutorA.hourly_price - tutorB.hourly_price)
			}
			if (state.sortBy === 'most_expensive') {
				state.displayedTutors = action.payload
					.slice()
					.sort((tutorA, tutorB) => tutorB.hourly_price - tutorA.hourly_price)
			}
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload
		},
	},
})

export const { setAllTutors, setDisplayedTutors, setSortBy } =
	tutorsSlice.actions

export default tutorsSlice.reducer
