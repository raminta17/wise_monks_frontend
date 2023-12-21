import { TutorTProp } from '@/modules/types'
import { useNavigate } from 'react-router-dom'

const TutorCard = ({ tutor, location }: TutorTProp) => {
	const navigate = useNavigate()
	return (
		<div
			onClick={() => navigate(`/tutor/${tutor.id}`)}
			className='flex gap-1 p-5 my-2 border rounded-md w-full justify-between items-center shadow-inner hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'
			style={{ flexDirection: location ? 'column' : 'row' }}
		>
			<div className='flex gap-1 flex-1 font-bold'>
				<p>{tutor.name}</p>
				<p>{tutor.surname}</p>
			</div>
			<div className='flex-1 text-center'>{tutor.tutor_specialization}</div>
			<div className='flex-1 text-end italic'>{tutor.hourly_price} €/hour</div>
		</div>
	)
}

export default TutorCard
