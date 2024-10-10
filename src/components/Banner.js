// import Button from 'react-bootstrap/Button';
// Bootstrap grid system components
// import Row from 'react-bootstrap/Row';
// import  { Row } from 'react-bootstrap';
// import Col from 'react-bootstrap/Col';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    console.log(data);
    const {title, content, destination, buttonLabel} = data;

    return (
        <Row>
            <Col>
                <h1>{title}</h1>
                <p>{content}</p>
                <Link className='btn btn-primary' to={destination}>{buttonLabel}</Link>
            </Col>
        </Row>
    )
}