class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method:"GET",
            headers:this._headers
        }).then(this._checkResponse);
    }

    getUpdateCard(data) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers:this._headers,
            body: JSON.stringify({
                name:data.name,
                link:data.link
            })
        }).then(this._checkResponse);
    }

    getInitialUser() {
        return fetch(`${this._url}/users/me`, {
            method:"GET",
            headers:this._headers
        }).then(this._checkResponse);
    }

    getUpdateUser(data) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers:this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        }).then(this._checkResponse);
    }

    updateAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method:"PATCH",
            headers:this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._checkResponse);
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method:"DELETE",
            headers:this._headers,
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers:this._headers,
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: 'edbcfffa-fd7f-40f5-bcf0-f7031d29761f',
        'Content-Type': 'application/json'
    }
});

export default api;