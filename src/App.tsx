import { Route, Routes } from 'react-router-dom'
import HeroPage from './Pages/HeroPage'
import SingleTutorPage from './Pages/SingleTutorPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<HeroPage />} />
				<Route path='/tutor/:id' element={<SingleTutorPage />} />
			</Routes>
		</>
	)
}

export default App
