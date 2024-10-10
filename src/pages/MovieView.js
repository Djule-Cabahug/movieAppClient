import { useState , useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function MovieView() {

    //create an instance of notyf to allow access to its methods and use
    const notyf = new Notyf();

    const { user } = useContext(UserContext);

    const { movieId } = useParams()

    //an object with methods to redirect the user

	const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
	const [year, setYear] = useState(0);
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    
    useEffect(()=> {
        console.log(movieId);

        fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${movieId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.hasOwnProperty("_id")){

                setTitle(data.title)
                setDirector(data.director)
                setYear(data.year)
                setDescription(data.description)
                setGenre(data.genre)
                setComments(data.comments.map(item => {
                    return (
                        <div className='my-5'>
                            <p className='fw-bold text-start'>{item.userId}</p>
                            <p className='text-start'>{item.comment}</p>
                        </div>
                    )
                }))

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        });

    }, [movieId]);

    
    const getComments = () => {

        fetch(`https://movieapp-api-lms1.onrender.com/movies/getComments/${movieId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            setComments(data.comments.map(item => {
                return (
                    <div className='my-5'>
                        <p className='fw-bold text-start'>{item.userId}</p>
                        <p className='text-start'>{item.comment}</p>
                    </div>
                )
            }))
        })
    }

    
    function addComment(e){

        e.preventDefault();

        fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${movieId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                comment: comment
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === "Movie not found"){

                notyf.error("Movie not found")

            } else if (data.message === 'comment added successfully'){

                setComment("");
                getComments();

                notyf.success('Comment added successfully')

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        })
    }


	return (
	<Container className="mt-5">
       <Row>
           <Col lg={{ span: 6, offset: 3 }}>
               <Card>
                   <Card.Body className="text-center">
                        <Link className='btn btn-dark back d-table me-auto' to="/movies">Back</Link>
                        <Card.Title className='mb-3'>{title}</Card.Title>
                        <Card.Subtitle>Description:</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle>Director:</Card.Subtitle>
                        <Card.Text>{director}</Card.Text>
                        <Card.Subtitle>Year:</Card.Subtitle>
                        <Card.Text>{year}</Card.Text>
                        <Card.Subtitle>Genre:</Card.Subtitle>
                        <Card.Text>{genre}</Card.Text>
                        {(user.id !== null) 
                        ?
                        <>
                            <Card.Subtitle className='fs-4 text-start mt-5'>Comments &#40;{comments.length}&#41;</Card.Subtitle>
                            <hr/>
                            <Form onSubmit={e => addComment(e)}>
                                <Form.Group className="mb-2" controlId="addComment">
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='success' className='d-block ms-auto'>Add Comment</Button>
                            </Form>
                            {comments}
                        </>
                        :
                        null
                        }
                    </Card.Body>        
               </Card>
           </Col>
       </Row>
   </Container>
           )	
	} 