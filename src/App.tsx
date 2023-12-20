import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import TutorCard from './components/TutorCard'
import { setAllTutors } from './store/features/tutorsSlice'
import { useAppDispatch, useAppSelector } from './store/store'

function App() {
	const [serverError, setServerError] = useState('')
	const dispatch = useAppDispatch()
	const tutors = useAppSelector(state => state.tutors.tutors)
	console.log('tutors', tutors)

	useEffect(() => {
		axios
			.get('http://localhost:8080/tutors')
			.then(function (response) {
				dispatch(setAllTutors(response.data))
			})
			.catch(function (error) {
				setServerError('Sorry, error has occured. Try again later')
				console.log(error)
			})
	}, [])

	return (
		<>
			{serverError ? (
				<div>{serverError}</div>
			) : (
				<div className='w-full md:w-4/5 m-auto text-center p-5'>
					<div className='text-5xl font-bold'>FIND YOUR TUTOR</div>
					<div>
						<form action=''>
							<input type='text' placeholder='type tutor name' />
						</form>
					</div>
					<div className='flex flex-col'>
						{tutors.map(tutor => (
							<TutorCard key={tutor.id} tutor={tutor} />
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default App
