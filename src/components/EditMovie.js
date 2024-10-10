import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Notyf } from 'notyf';

export default function EditMovie({ movie, fetchData }) {
	const notyf = new Notyf();

	const [movieId, setMovieId] = useState(movie._id);
	const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director);
	const [year, setYear] = useState(movie.year);
	const [description, setDescription] = useState(movie.description);
	const [genre, setGenre] = useState(movie.genre);
	const [showEdit, setShowEdit] = useState(false);


	const openEdit = () => {
		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false)
	}

	const editMovie = (e, movieId) => {
		e.preventDefault();

		fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movieId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title: title,
				director: director,
				year: year,
				description: description,
				genre: genre
			})
		})
		.then(res=> res.json())
		.then(data => {

			console.log(data)

			if (data.message === 'Movie updated successfully'){

				closeEdit();
				fetchData();

				notyf.success("Movie successfully updated");

			} else if (data.error === 'Movie not found') {

				closeEdit();
				fetchData();

				notyf.error('Movie not found');

			} else {

				closeEdit();
				fetchData();

				notyf.error("Something went wrong. Contact System Admin.");
			}
		})
	}

	const addComment = () => {

	}


	return (
		<>
			<Button variant = "success" className='d-block mx-auto' onClick={() => openEdit()}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
               <Form onSubmit={e => editMovie(e, movieId)}>
                   <Modal.Header closeButton>
                       <Modal.Title>Edit Movie</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>    
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
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={closeEdit}>Close</Button>
                       <Button variant="primary" type="submit">Submit</Button>
                   </Modal.Footer>
	               </Form>
	           </Modal>
	    </>
	)
}