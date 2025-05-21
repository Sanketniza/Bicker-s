import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


import one from '../../assets/adv/1.jpeg';
import two from '../../assets/adv/2.jpeg';
import three from '../../assets/adv/3.jpeg';
import four from '../../assets/adv/4.jpeg';
// import four from '../../assets/adv/44.jpeg';
import five from '../../assets/adv/5.jpeg';
import six from '../../assets/adv/6.jpeg';
import seven from '../../assets/adv/7.jpeg';
import eight from '../../assets/adv/8.jpeg';
import nine from '../../assets/adv/9.jpeg';
import ten from '../../assets/adv/10.jpeg';
import eleven from '../../assets/adv/11.jpeg';
import twelve from '../../assets/adv/12.jpeg';
import thirteen from '../../assets/adv/13.jpeg';
import fourteen from '../../assets/adv/14.jpeg';
import fifteen from '../../assets/adv/15.jpeg';




import '../../css/ad.css';

const generateSlides = () => {
    return [
        { src: one, alt: 'Image 1' },
        { src: two, alt: 'Image 2' },
        { src: three, alt: 'Image 3' },
        { src: four, alt: 'Image 4' },
        { src: five, alt: 'Image 5' },
        { src: six, alt: 'Image 6' },
        { src: seven, alt: 'Image 7' },
        { src: eight, alt: 'Image 8' },
        { src: nine, alt: 'Image 9' },
        { src: ten, alt: 'Image 10' },
        { src: eleven, alt: 'Image 11' },
        { src: twelve, alt: 'Image 12' },
        { src: thirteen, alt: 'Image 13' },
        { src: fourteen, alt: 'Image 14' },
        { src: fifteen, alt: 'Image 15' },
    ];
};

const Ad = () => {
    const options = {
        type: 'loop',
        gap: '1rem',
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        height: '500px',
        width: '100%',
        perPage: 1,
        perMove: 1,
        focus: 'center',
        cover: false, // Changed to false to let our custom styling handle this
        pagination: false,
        arrows: true,
        breakpoints: {
            640: {
                height: '300px',
                gap: '0.5rem',
            },
            1024: {
                height: '400px',
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
                        <SplideSlide key={slide.src} className="flex items-center justify-center">
                            <div className="relative h-full w-full rounded-xl overflow-hidden">
                                <img 
                                    src={slide.src} 
                                    alt={slide.alt} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{
                                        objectPosition: 'center'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
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
            </Splide>
        </div>
    ); 
};

export default Ad;