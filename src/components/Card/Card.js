import React from "react";

const Card = ({card,onCardClick}) => {

    const handleClick = () => {
        onCardClick(card);
    };

    return(
        <li className="card">
            <button
                aria-label="Кнопка удалить фото"
                className="card__delete-btn"
                type="button"
            >
            </button>
            <img
                className="card__photo"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="card__text">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button
                        aria-label="Кнопка мне нравится"
                        className="card__like"
                        type="button"
                    >
                    </button>
                    <p className="card__like-number"></p>
                </div>
            </div>
        </li>
    )
};

export default Card