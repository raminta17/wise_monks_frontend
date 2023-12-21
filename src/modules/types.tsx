export type TutorT = {
	id: number
	name: string
	surname: string
	tutor_specialization: string
	hourly_price: number
	hasLessons: number
}

export type TutorsStateT = {
	allTutors: TutorT[]
	displayedTutors: TutorT[]
	sortBy: string
}
export type TutorTProp = {
	tutor: TutorT
	location: string
}
export type clearPropT = {
	clear: boolean
	setClear: React.Dispatch<React.SetStateAction<boolean>>
}
