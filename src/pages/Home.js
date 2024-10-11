import Banner from '../components/Banner';
import { Carousel, Row, Col } from 'react-bootstrap';
// import FeaturedCourses from '../components/FeaturedCourses';
// import Highlights from '../components/Highlights';

export default function Home() {

    const data = {
        title: "Welcome to our Movie Catalog",
        content: "Where you can watch all your favorite movies and shows",
        destination: "/login",
        buttonLabel: "Start Now"
    }


    return (
        <div className='banner text-center'>
            <Banner data={data}/>
        </div>
  );
}
