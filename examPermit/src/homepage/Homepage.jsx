import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navigation.jsx';
import styles from './homepageStyle.module.css';
import ImageSlider from './ImageSlider.jsx';

function Homepage() {
  const navigate = useNavigate();
  console.log(localStorage.getItem('role'));
  console.log(localStorage.getItem('uid'));

 useEffect(() => {
         const userAccess = localStorage.getItem('role');
         if(userAccess !== 'Student'){
             navigate('/');
         }
     }, [navigate]);

  return (
    <>
      <Navbar />
      <ImageSlider/>
    </>
  );
}

export default Homepage;
