import { useEffect, useRef, useState } from 'react';
import styles from './homepageStyle.module.css';
import slider1 from '../assets/slider/1-ABM.jpg';
import slider2 from '../assets/slider/2-MMA.jpg';
import slider3 from '../assets/slider/3-IT.jpg';
import slider4 from '../assets/slider/4-Tourism.jpg';
import slider5 from '../assets/slider/5-Culinary.jpg';
import slider6 from '../assets/slider/6-STEM.jpg';
import slider7 from '../assets/slider/7-HUMMS.jpg';
import slider8 from '../assets/slider/8-unhinged.jpg';

const images = [slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8];

function ImageSlider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        startSlider();
        return () => clearInterval(intervalRef.current);
    }, []);

    const startSlider = () => {
        intervalRef.current = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % images.length);
        }, 5000);
    };

    const showSlide = index => {
        if (index < 0) {
            setSlideIndex(images.length - 1);
        } else if (index >= images.length) {
            setSlideIndex(0);
        } else {
            setSlideIndex(index);
        }
    };

    const prevSlide = () => {
        clearInterval(intervalRef.current);
        showSlide(slideIndex - 1);
    };

    const nextSlide = () => {
        clearInterval(intervalRef.current);
        showSlide(slideIndex + 1);

    };
    return (
        <div className={styles.slider}>
            <div className={styles.slides}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        className={`${styles.slide} ${index === slideIndex ? styles.displaySlide : ''}`}
                        src={img}
                        alt={`Image ${index + 1}`}
                    />
                ))}
            </div>
            <button className={styles.prev} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={styles.next} onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    )
}

export default ImageSlider