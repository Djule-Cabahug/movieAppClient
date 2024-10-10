import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function UserView({moviesData}) {

	const [movies, setMovies] = useState([])

	useEffect(() => {
		console.log(moviesData);

		const moviesArr = moviesData.map(movie => {
			return(
				<MovieCard movieProp={movie} key={movie._id}/>
			)
		})

		//set the movies state to the result of our map function, to bring our returned movie component outside of the scope of our useEffect where our return statement below can see.
		setMovies(moviesArr)

	}, [moviesData])


	return(
		<>
			<h2 className='movies-title text-center my-3'>Movies</h2>
			<Row>
				{ movies }
			</Row>
		</>
		)
}