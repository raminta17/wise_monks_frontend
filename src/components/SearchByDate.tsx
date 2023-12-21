import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { clearPropT } from '@/modules/types'
import { setDisplayedTutors } from '@/store/features/tutorsSlice'
import axios from 'axios'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { Calendar } from './ui/calendar'

const SearchSortForm = ({ clear, setClear }: clearPropT) => {
	const [date, setDate] = useState<Date | null>()
	const dispatch = useAppDispatch()
	const tutors = useAppSelector(state => state.tutors.allTutors)
	const apiUrlLocal = import.meta.env.VITE_API_BASE_URL_LOCAL

	useEffect(() => {
		if (!date) return
		let selectedDay
		if (date) selectedDay = format(date, 'yyyy-MM-dd')
		axios
			.post(apiUrlLocal + `tutors/date`, { date: selectedDay })
			.then(function (response) {
				if (response.data.length === 0)
					return console.log('no available tutors this day')
				const availableTutors = tutors.filter(tutor =>
					response.data.includes(tutor.id),
				)
				dispatch(setDisplayedTutors(availableTutors))
				setClear(false)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [date])
	useEffect(() => {
		if (clear) setDate(null)
	}, [clear])
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground',
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default SearchSortForm
