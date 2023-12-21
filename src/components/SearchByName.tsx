import { clearPropT } from '@/modules/types'
import React, { useEffect, useState } from 'react'
import { Input } from '../components/ui/input'
import { setDisplayedTutors } from '../store/features/tutorsSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
export default function SearchByName({ clear, setClear }: clearPropT) {
	const [search, setSearch] = useState('')
	const dispatch = useAppDispatch()
	const allTutors = useAppSelector(state => state.tutors.allTutors)

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value)
	}
	useEffect(() => {
		const foundTutors = allTutors.filter(
			tutor =>
				tutor.name.toLowerCase().includes(search) ||
				tutor.surname.toLowerCase().includes(search),
		)
		dispatch(setDisplayedTutors(foundTutors))
		setClear(false)
	}, [search])
	useEffect(() => {
		if (clear) setSearch('')
	}, [clear])
	return (
		<form action=''>
			<Input
				type='search'
				value={search}
				onChange={handleSearch}
				placeholder='search for tutor...'
			/>
		</form>
	)
}
