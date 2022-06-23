import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupConform from "../PopupConform/PopupConform";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import api from "../../utils/Api";

const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    //const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([])



    React.useEffect(() => {
        Promise.all([ api.getInitialUser(), api.getInitialCards()])
            .then(([userData,initialCards]) => {
                setCurrentUser(userData)
                setCards(initialCards)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    const handleCardLike = (card) => {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        //setIsDeletePopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}

                >
                </Main>
                <Footer/>
                <PopupWithForm
                    name="profile"
                    title="Редактировать профиль"
                    buttonText="Сохранить"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input
                        aria-label="Поле ввода имени"
                        className="popup__line popup__line_type_name"
                        id="name-form"
                        placeholder="Ваше Имя"
                        type="text"
                        name="name"
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <span id="name-form-error" className="error"></span>
                    <input
                        aria-label="Поле ввода описания"
                        name="about"
                        className="popup__line popup__line_type_info"
                        id="job-form"
                        placeholder="Описание"
                        type="text"
                        minLength="2"
                        maxLength="200"
                        required
                    />
                    <span id="job-form-error" className="error"></span>
                </PopupWithForm>
                <PopupWithForm
                    name="photo"
                    title="Новое место"
                    buttonText="Создать"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
                    <input
                        aria-label="Поле ввода названия места"
                        className="popup__line"
                        id="name-place"
                        placeholder="Название"
                        type="text"
                        name="name"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span id="name-place-error" className="error"></span>
                    <input
                        aria-label="Поле ввода ссылки на картинку"
                        className="popup__line"
                        id="name-link"
                        placeholder="Ссылка на картинку"
                        type="url"
                        name="link"
                        required
                    />
                    <span id="name-link-error" className="error"></span>
                </PopupWithForm>
                <PopupWithForm
                    name="avatar"
                    title="Обновить аватар"
                    buttonText="Сохранить"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <input
                        aria-label="Поле ввода названия аватара"
                        className="popup__line"
                        id="name-avatar"
                        placeholder="Ссылка на Аватар"
                        type="url"
                        name="avatar"
                        minLength="2"
                        required
                    />
                    <span id="name-avatar-error" className="error"></span>
                </PopupWithForm>
                <PopupConform
                    //isOpen={isDeletePopupOpen}
                    //isClose={closeAllPopup}
                >
                </PopupConform>
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                >
                </ImagePopup>
            </div>
        </CurrentUserContext.Provider>
    )
};

export default App