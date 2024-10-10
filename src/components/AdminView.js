import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';


export default function AdminView({ moviesData, fetchData }) {


    const [movies, setMovies] = useState([])


    //Getting the moviesData from the movies page
    useEffect(() => {
        console.log(moviesData);

        const moviesArr = moviesData.map(movie => {
            return (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.description}</td>
                    <td>{movie.genre}</td>
                    <td><EditMovie movie={movie} fetchData={fetchData} /></td> 
                    <td><DeleteMovie movie={movie} fetchData={fetchData}/></td>
                </tr>
                )
        })

        setMovies(moviesArr)

    }, [moviesData])


    return(
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <Link className='btn btn-warning mb-3 add-movie-btn' to="/addMovie" >Add Movie<span className='material-symbols-outlined'>add</span></Link>

            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className='text-white bg-dark'>Title</th>
                        <th className='text-white bg-dark'>Director</th>
                        <th className='text-white bg-dark'>Year</th>
                        <th className='text-white bg-dark'>Description</th>
                        <th className='text-white bg-dark'>Genre</th>
                        <th className='text-white bg-dark' colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {movies}
                </tbody>
            </Table>    
        </>

        )
}