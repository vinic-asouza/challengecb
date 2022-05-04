import React from 'react'
import Slider from "react-slick";

// import './styles.css'

export default function Banner() {
    let bannerimg = '';
    window.innerWidth > 910 ?
        bannerimg = '/assets/img/fullbanner.png' :
        bannerimg = '/assets/img/fullbannerMobile.png'

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="banner">
            <ul className="banner__list">
                <Slider {...settings}>
                    <li className="banner__item">
                        <img className="banner__image" src={bannerimg} alt="Criar ou migrar seu e-commerce?" />
                    </li>
                    <li className="banner__item">
                        <img className="banner__image" src={bannerimg} alt="Criar ou migrar seu e-commerce?" />
                    </li>
                    <li className="banner__item">
                        <img className="banner__image" src={bannerimg} alt="Criar ou migrar seu e-commerce?" />
                    </li>
                </Slider>

            </ul>
        </div>
    );
}
