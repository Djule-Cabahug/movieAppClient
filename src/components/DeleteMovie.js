import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteMovie({movie, fetchData}){

    const notyf = new Notyf();

    const [movieId, setMovieId] = useState(movie._id)

    const deleteMovie = () => {

        fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === 'Movie not deleted'){

                fetchData();

                notyf.error("Movie not deleted");

            } else if (data.message === 'Movie deleted successfully') {

                fetchData();

                notyf.success("Movie deleted successfully");

            } else {

                fetchData();

                notyf.error("Something went wrong. Contact System Admin.");
            }
        })
    }

    return (
        <Button variant='danger' className='d-block mx-auto' onClick={deleteMovie}>Delete</Button>
    )
}