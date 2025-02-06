import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import one from '../../assets/adv/1.jpg';
import two from '../../assets/adv/2.jpg';
import three from '../../assets/adv/RE Classic500.jpg';
import four from '../../assets/adv/Yamaha.jpg';

import '../../css/ad.css';

const generateSlides = () => {
    return [
        { src: one, alt: 'Image 1' },
        { src: two, alt: 'Image 2' },
        { src: three, alt: 'Image 3' },
        { src: four, alt: 'Image 4' },
    ];
};

const Ad = () => {
     const options = {
        type: 'loop',
        gap: '1rem',
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        heightRatio: 0.4, // Aspect ratio (0.5 = 2:1)
        cover: true,
        pagination: false,
        
        arrows: true,
        breakpoints: {
            640: {
                heightRatio: 0.6,
                gap: '0.5rem',
            },
            1024: {
                heightRatio: 0.4,
            },
        },
        classes: {
            arrows: 'splide__arrows your-arrows-class',
            arrow: 'splide__arrow your-arrow-class',
        },
    }; 

    return (
        <div className="wrapper max-w-[80%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto px-4 my-10">
            <Splide
                options={options}
                aria-labelledby="autoplay-example-heading"
                hasTrack={false}
            >
                <SplideTrack>
                    {generateSlides().map((slide) => (
                        <SplideSlide key={slide.src}>
                            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
                                <img 
                                    src={slide.src} 
                                    alt={slide.alt} 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                        </SplideSlide>
                    ))}
                </SplideTrack>

                <div className="splide__progress mt-2" style={{ backgroundColor: '#F6B445' }}>
                        <div className="splide__progress__bar" />
                    </div>

                    <button className="splide__toggle mx-auto flex flex-col items-center justify-center my-3">
                        <span className="splide__toggle__pause">Pause</span>
                        <span className="splide__toggle__play">Play</span>

                        <div id="clip">
                            <div id="leftTop" className="corner"></div>
                            <div id="rightBottom" className="corner"></div>
                            <div id="rightTop" className="corner"></div>
                            <div id="leftBottom" className="corner"></div>
                        </div>
                            <span id="rightArrow" className="arrow"></span>
                            <span id="leftArrow" className="arrow"></span>
                    </button>

                {/* </div> */}
            </Splide>
        </div>
    ); 
};

export default Ad;