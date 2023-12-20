import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { tutorsSlice } from './features/tutorsSlice.tsx'

export const store = configureStore({
	reducer: {
		tutors: tutorsSlice.reducer,
	},
})

export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector

export const useAppDispatch: () => typeof store.dispatch = useDispatch
