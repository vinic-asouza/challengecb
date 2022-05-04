import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import BuyButton from '../BuyButton'

import api from '../../services/api'

export default function Products(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function loadProducts() {
            const res_products = await api.get('products');
            setProducts(res_products.data);
        }
        loadProducts();
    }, []);

    function Prices(props) {
        const promotion = JSON.stringify(props.promotion);
        const regular = JSON.stringify(props.regular)

        const promotionFormated = promotion.substr(0, promotion.length - 2) + ',' + promotion.substr(-2);
        const regularFormated = regular.substr(0, regular.length - 2) + ',' + regular.substr(-2);

        if (promotion > 0) {
            return (
                <>
                    <p className="showcase__prices--promotion">de R$ {promotionFormated}</p>
                    <p className="showcase__prices--regular">por R$ {regularFormated}</p>
                </>
            )
        } else return <p className="showcase__prices--regular">por R$ {regularFormated}</p>
    }

    function PriceHandling(value) {
        value = value.toString();
        let vformated = value.substr(0, value.length - 2) + ',' + value.substr(-2);
        return vformated
    }

    function RatingStars(rate, pid) {
        let structure = []
        for (let i = 1; i <= 5; i++) {
            rate >= i ?
                structure[i - 1] = <span key={pid + i}><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.69478 8.68583L9.21415 10.649L8.28021 6.94899L11.3896 4.45951L7.29501 4.13846L5.69478 0.648987L4.09454 4.13846L0 4.45951L3.10935 6.94899L2.17541 10.649L5.69478 8.68583Z" fill="#F8475F" key={pid + i} /></svg></span> :
                structure[i - 1] = <span key={pid + i}><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3896 4.4595L7.29501 4.13318L5.69478 0.648972L4.09454 4.13845L0 4.4595L3.10935 6.94897L2.17541 10.649L5.69478 8.68581L9.21415 10.649L8.2859 6.94897L11.3896 4.4595ZM5.69477 7.70161L3.55353 8.89634L4.12301 6.64371L2.23234 5.12792L4.72666 4.92792L5.69477 2.80687L6.66857 4.93319L9.16289 5.13319L7.27222 6.64897L7.8417 8.90161L5.69477 7.70161Z" fill="#F8475F" /></svg></span>
        }
        return <>
            {structure}
        </>
    }

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    return (
        <div className="showcase">
            <div className="showcase__container">
                <h2 className="showcase__title">{props.name}</h2>

                <ul className="showcase__list">
                    <Slider {...settings}>
                        {products.map((item, index) => (
                            <li className="showcase__item" key={item.productId}>
                                <div className="showcase__figure">
                                    {item.listPrice != null ?
                                        <span className="showcase__seal">
                                            <p>OFF</p>
                                        </span>
                                        : ''
                                    }
                                    <img src={item.imageUrl} alt={item.productName} />
                                </div>

                                <div className="showcase__info">
                                    <h3 className="showcase__name">{item.productName}</h3>
                                    <div className="showcase__rating">
                                        {RatingStars(item.stars, index)}
                                    </div>
                                    <div className="showcase__prices">
                                        <Prices promotion={item.listPrice} regular={item.price} />
                                        {item.installments[0] != null ?
                                            <p className="showcase__prices--installments">
                                                ou em {item.installments[0].quantity}x de R$ {PriceHandling(item.installments[0].value)}
                                            </p>
                                            : ''
                                        }
                                    </div>
                                    <BuyButton />
                                </div>
                            </li>
                        ))}
                    </Slider>
                </ul>
            </div>
        </div>
    )
}
