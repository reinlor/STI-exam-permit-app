import { useEffect, useRef, useState } from 'react';
import styles from './homepageStyle.module.css';
import slider1 from '../assets/slider/car1.avif';
import slider2 from '../assets/slider/car2.avif';
import slider3 from '../assets/slider/car3.avif';
import slider4 from '../assets/slider/car4.avif';

const images = [slider1, slider2, slider3, slider4];

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