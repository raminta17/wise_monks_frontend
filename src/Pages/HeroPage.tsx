import axios from 'axios'
import { useEffect, useState } from 'react'
import '../App.css'
import SortBy from '../components/SortBy'
import TutorCard from '../components/TutorCard'

import SearchByDate from '../components/SearchByDate'
import SearchByName from '../components/SearchByName'
import { setAllTutors, setDisplayedTutors } from '../store/features/tutorsSlice'
import { useAppDispatch, useAppSelector } from '../store/store'

function HeroPage() {
	const [serverError, setServerError] = useState('')
	const dispatch = useAppDispatch()
	const allTutors = useAppSelector(state => state.tutors.allTutors)
	const displayedTutors = useAppSelector(state => state.tutors.displayedTutors)
	const apiUrlLocal = import.meta.env.VITE_API_BASE_URL_LOCAL
	const [clear, setClear] = useState(false)

	const getAllTutors = () => {
		axios
			.get(apiUrlLocal + 'tutors')
			.then(function (response) {
				dispatch(setAllTutors(response.data))
				dispatch(setDisplayedTutors(response.data))
			})
			.catch(function (error) {
				setServerError('Sorry, error has occurred. Try again later.')
				console.log(error)
			})
	}

	useEffect(() => {
		getAllTutors()
	}, [])

	function handleClearFilters() {
		dispatch(setDisplayedTutors(allTutors))
		setClear(true)
	}

	return (
		<>
			{serverError ? (
				<div>{serverError}</div>
			) : (
				<div className='w-full md:w-4/5 lg:w-3/5 m-auto text-center p-10 flex flex-col gap-5'>
					<div className='text-5xl font-bold'>FIND YOUR TUTOR</div>
					<div className='flex gap-1 items-center justify-between'>
						<SortBy clear={clear} setClear={setClear} />
						<SearchByName clear={clear} setClear={setClear} />
						<SearchByDate clear={clear} setClear={setClear} />
						<div
							onClick={handleClearFilters}
							className='hover:underline text-sm'
						>
							Clear filters
						</div>
					</div>
					<div className='flex flex-col'>
						{displayedTutors.map(tutor => (
							<TutorCard key={tutor.id} tutor={tutor} location={''} />
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default HeroPage
