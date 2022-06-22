import React from "react";
import api from "../../utils/Api";
import Card from "../Card/Card";

const Main = ({onEditAvatar, onEditProfile, onAddPlace,onCardClick}) => {

    const [userName,setUserName] = React.useState('');
    const [userDescription,setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([ api.getInitialUser(), api.getInitialCards()])
            .then(([userData,cards]) => {
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
                setCards(cards)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info-avatar">
                    <button
                        onClick={onEditAvatar}
                        aria-label="Изменить фото аватара"
                        className="profile__avatar-button">
                    </button>
                    {userAvatar && (<img className ="profile__avatar" src={userAvatar} alt="Ваш аватар"  />)}
                </div>
                <div className="profile__block">
                    <h1 className="profile__name">{userName}</h1>
                    <button
                        onClick={onEditProfile}
                        aria-label="Кнопка редактирования профиля"
                        className="profile__edit"
                        type="button">
                    </button>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button
                    aria-label="Кнопка добавления фото"
                    className="profile__add-photo"
                    type="button"
                    onClick={onAddPlace}
                >
                </button>
            </section>
            <section className="elements">
                <ul className="gallery">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        >
                        </Card>
                    ))}
                </ul>
            </section>
        </main>
    )
};

export default Main