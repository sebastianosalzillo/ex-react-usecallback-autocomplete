import React from "react";
import "./card.css"
function Card({ title, description, price }) {


    return (
        <div className="card-container">
            <h2 className="title">{title}</h2>
            <p className="price">Questo e il prezzo : {price}</p>
            <p className="description">{description}</p>

        </div>
    )
}

export default React.memo(Card)