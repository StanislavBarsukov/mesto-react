import React from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import api from "../../utils/Api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

import ImagePopup from "../ImagePopup/ImagePopup";
import PopupConform from "../PopupConform/PopupConform";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";

const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    //const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

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
        const isLiked = card.likes.some(i => i._id === currentUser._id);
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

    const handleUpdateUser = (userData) => {
      api.setUserInfo(userData)
          .then((res) => {
              setCurrentUser(res);
              closeAllPopups();
          })
          .catch((err) => {
              console.log(`Ошибка: ${err}`);
          });
    };

    const handleUpdateAvatar = (avatarData) => {
        api.setUserAvatar(avatarData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    const handleAddPlaceSubmit = (newData) => {
        api.setUpdateCard(newData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        //setIsDeletePopupOpen(false);
    };

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
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                >
                </EditProfilePopup>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                >
                </EditAvatarPopup>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCard={handleAddPlaceSubmit}
                >
                </AddPlacePopup>
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