import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { clearPropT } from '@/modules/types'
import { setDisplayedTutors, setSortBy } from '@/store/features/tutorsSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { SetStateAction, useEffect } from 'react'

export default function SortBy({ clear, setClear }: clearPropT) {
	const sortBy = useAppSelector(state => state.tutors.sortBy)
	const dispatch = useAppDispatch()
	const allTutors = useAppSelector(state => state.tutors.displayedTutors)

	useEffect(() => {
		const sortedTutors = allTutors
		dispatch(setDisplayedTutors(sortedTutors))
		setClear(false)
	}, [sortBy])
	useEffect(() => {
		if (clear) dispatch(setSortBy('A-Z'))
	}, [clear])
	return (
		<Select
			value={sortBy}
			onValueChange={(value: SetStateAction<string>) =>
				dispatch(setSortBy(value))
			}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Sort by' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='A-Z'>A-Z</SelectItem>
				<SelectItem value='Z-A'>Z-A</SelectItem>
				<SelectItem value='cheapest'>€-€€€</SelectItem>
				<SelectItem value='most_expensive'>€€€-€</SelectItem>
				<SelectItem value='most_available'>most available</SelectItem>
				<SelectItem value='least_available'>least available</SelectItem>
			</SelectContent>
		</Select>
	)
}
