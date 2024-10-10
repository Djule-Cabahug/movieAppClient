import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {

    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`https://fitnessapp-api-ln8u.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.access !== undefined){

                console.log(data.access);

                // Stores the token of the authenticated user in the local storage
                // Syntax: localStorage.setItem('propertyName', value)
                localStorage.setItem('token', data.access)

                // update user state variable with setUser()
                setUser({
                    id: localStorage.getItem("token")
                })

                // Clear input fields after submission
                setEmail('');
                setPassword('');

                notyf.success(`You are now logged in`);
            
            } else if (data.error === "Email and password do not match") {

                notyf.error(`Email and password do not match`);

            } else if (data.error === "No Email Found") {

               notyf.error(`${email} does not exist`);

            } else {

				notyf.error("Something went wrong. Please contact us for assistance.")
			}
        })
    }
    

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (    
            
        (user.id !== null)
        ?
        <Navigate to="/workouts" />
        :
        <>
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit" id="loginBtn">
                        Login
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="loginBtn" disabled>
                        Login
                    </Button>
                }
            </Form>     
            
            <p className='text-center'>Don't have an account yet? <Link to="/register">Click here</Link> to register.</p>
        </>
    )
}