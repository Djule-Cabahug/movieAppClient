import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
// import moviesData from '../data/moviesData';

import UserContext from '../context/UserContext';

export default function Movies() {

	const {user} = useContext(UserContext);

	// Checks to see if the mock data was captured
	// console.log(moviesData);
	// console.log(moviesData[0]);

	const [movies, setMovies] = useState([]);
	//Create a function and add the fetch data here
	const fetchData = () => {

		//headers is included for both /movies/all and /movies/ to allow flexibility even if it is not needed.
		fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovies`)
		.then(res => res.json())
		.then(data => {

			setMovies(data.movies)
		});
	}

	//Use the useEffect to render all available movies
	//add user global state as its dependency to ensure that in every refresh, we run the useEffect and the fetchData() method.
	useEffect(() => {

		fetchData()

	}, [user]);

	console.log(user);
	


	// The "map" method loops through the individual movie objects in our array and returns a component for each movie
	// Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
	// Everytime the map method loops through the data, it creates a "MovieCard" component and then passes the current element in our moviesData array using the movieProp
	// const movies = moviesData.map(movie => {
	//     return (
	//         <MovieCard key={movie.id} movieProp={movie}/>
	//     );
	// })

	// useEffect(() => {

	// 	//get all active movies
	//     fetch("http://localhost:4000/movies/")
	//     .then(res => res.json())
	//     .then(data => {
	        
	//         console.log(data);

	//         // Sets the "movies" state to map the data retrieved from the fetch request into several "MovieCard" components
	//         setMovies(data);

	//     });

	// }, []);

	return(
		(user.isAdmin === true)
		?
			<AdminView moviesData={movies} fetchData={fetchData} />
		:
			<UserView moviesData={movies} />
	)
}