import React from 'react';

const BuyButton = () => {
    // const [buyitems, setBuyItems] = React.useState(['']);

    function BuyProd() {
        let qtdprods = localStorage.getItem('qtdCart') || 0;
        qtdprods = parseInt(qtdprods) + 1;
        document.getElementById('cart__qnt').innerHTML = qtdprods;
        localStorage.setItem('qtdCart', qtdprods);
    }

    return (
        <>
            <button className="showcase__buy" onClick={BuyProd}>COMPRAR</button>
        </>
    );
}

export default BuyButton;
