import { Timer } from "components/carousel/timer.js";
import { useState } from "react";
import { baseURL } from "utils/communication.js";
import "./carousel.css";
import "./slide_animation.css";

export function Carousel(props) {

    let transitionTimeMs = props.transitionTimeMs;
    let timeToChangeMs = props.timeToChangeMs + transitionTimeMs;

    const [currentImage, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((currentImage + 1) % imagesLength);
    };

    Timer(nextSlide, timeToChangeMs);

    let images = props.urlImages;
    let imagesLength = images.length;

    if (!Array.isArray(images) || imagesLength <= 0) {
        return null;
    }


    return <div className="carousel" style={{'--transition_time': ''+ transitionTimeMs/1000 +'s'}}>
        {
            images.map((image, index) => {
                let carouselClassAnimation = "";
                if ((currentImage === index)) {
                    carouselClassAnimation = "carousel_image_on";
                } else {
                    if ((((currentImage + imagesLength -1) % imagesLength) === index)) {
                            carouselClassAnimation = "carousel_image_transition_out";
                    }else{
                        carouselClassAnimation = "carousel_image_off";
                    }
                }


                return <div key={index} className={"carousel_image_holder " + carouselClassAnimation}>
                    <img src={baseURL + image.attributes.image.data.attributes.url} alt="Image de pizza" />
                </div>
            })
        }
    </div>
}