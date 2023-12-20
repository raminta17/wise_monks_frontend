import React from 'react'

import { TutorT } from '../store/features/tutorsSlice'

export type TutorTProp = {
	tutor: TutorT
}
const TutorCard = ({ tutor }: TutorTProp) => {
	return (
		<div className='flex gap-1 p-5 my-2 border rounded-md w-full justify-between shadow-inner hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
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
