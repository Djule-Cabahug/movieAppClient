import { useState, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddMovie(){

	const notyf = new Notyf();

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	//input states
	const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
	const [year, setYear] = useState(0);
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");

	function createMovie(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`https://movieapp-api-lms1.onrender.com/movies/addMovie`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				title: title,
				director: director,
				year: year,
				description: description,
				genre: genre

			})
		})
		.then(res => res.json())
		.then(data => {

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);


			if (data.hasOwnProperty("_id")) {
				
				setTitle("")
				setDirector("")
		        setYear(0);
		        setDescription("")
		        setGenre("")

				notyf.success("Movie Creation Successful")

				navigate("/movies");

			} else {

				notyf.error("Something Went Wrong. Notify System Admin.")

			}

		})

	}

	return (

            (user.isAdmin === true)
            ?
            <>
                <h1 className="my-5 text-center">Add Movie</h1>
                <Form onSubmit={e => createMovie(e)}>
                    <Form.Group controlId="movieTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control 
							type="text"
							value = {title}
							onChange={e => setTitle(e.target.value)} 
							required/>
					</Form.Group>
					<Form.Group controlId="movieDescription">
						<Form.Label>Director</Form.Label>
						<Form.Control 
							type="text" 
							value = {director}
							onChange={e => setDirector(e.target.value)} 
							required/>
					</Form.Group>
					<Form.Group controlId="movieYear">
						<Form.Label>Year</Form.Label>
						<Form.Control 
							type="number" 
							value = {year}
							onChange={e => setYear(e.target.value)} 
							required/>
					</Form.Group>
					<Form.Group controlId="movieDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control 
							type="text" 
							value = {description}
							onChange={e => setDescription(e.target.value)} 
							required/>
					</Form.Group>
					<Form.Group controlId="movieGenre">
						<Form.Label>Genre</Form.Label>
						<Form.Control 
							type="text" 
							value = {genre}
							onChange={e => setGenre(e.target.value)} 
							required/>
					</Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
		    </>
            :
            <Navigate to="/movies" />

	)


}