import TutorCard from '@/components/TutorCard'
import { Calendar } from '@/components/ui/calendar'
import { useAppSelector } from '@/store/store'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import 'react-day-picker/dist/style.css'
import { useNavigate, useParams } from 'react-router-dom'
export default function SingleTutorPage() {
	const navigate = useNavigate()
	const { id } = useParams()
	const tutor = useAppSelector(state => state.tutors.allTutors).find(
		tutor => tutor.id === Number(id),
	)
	const apiUrlLocal = import.meta.env.VITE_API_BASE_URL_LOCAL
	const [bookedDays, setDays] = useState([])
	useEffect(() => {
		if (!tutor) return navigate('/')
		axios
			.get(apiUrlLocal + 'tutors/' + id)
			.then(function (response) {
				setDays(response.data.map((timestamp: number) => new Date(timestamp)))
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	const bookedStyle = { backgroundColor: 'red' }
	return (
		<div className='p-5 w-full md:w-3/4 m-auto text-center flex flex-col gap-5'>
			<div onClick={() => navigate('/')}>
				<ArrowLeft className=' hover:scale-125 transition ease-in-out duration-300' />
			</div>

			<div className='text-3xl font-bold'>Tutor Page</div>

			<div className='w-1/2 m-auto '>
				{tutor && <TutorCard tutor={tutor} location={'tutorPage'} />}
				{bookedDays.length > 0 && (
					<Calendar
						modifiers={{ booked: bookedDays }}
						modifiersStyles={{ booked: bookedStyle }}
					/>
				)}
			</div>
		</div>
	)
}
