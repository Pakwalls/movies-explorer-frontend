import { useEffect, useState } from "react";
import { isEqual } from "../../utils/isEqual";
import { ERRORS } from "../../utils/constants";
import { updateUserData } from "../../utils/MainApi";


function Profile({ user, handleLogOut, onUpdateUser }) {
  const [btnText, setBtnText] = useState('Редактировать');
  const [isTouched, setIsTouched] = useState(false);
  const [isEqualFormData, setIsEqualFormData] = useState(true);
  const [formData, setFormData] = useState(user);
  const [error, setError] = useState('');

  /*
    Формдата для изменения и хранения информации о пользователе
    флаг-значение для определения поменяли ли мы форм дату
    хендлер дл обновления информации о пользователе
    хендлер ошибок чтобы менять сотсояние нижнего блока с кнопками
  */

  const handleChangeFormData = (e) => {
    setIsTouched(true)
    const { name, value, validationMessage } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
    setError(validationMessage)
  }

  const handleSubmitForm = (e) => {
    updateUserData(formData.name, formData.email)
      .then(data => {
        setFormData(data);
        onUpdateUser(data);
      })
      .catch(err => {
        if (err.status === 409) {
          setError(ERRORS.EMAIL_EXIST_ERROR)
        } else {
          setError(ERRORS.PROFILE.SERVER_ERROR)
        }
      })
  }

  useEffect(() => {
    if (isTouched) {
      setIsEqualFormData(isEqual(formData, user))
    }
  }, [formData, isTouched, user])

    useEffect(() =>{
      setBtnText(isEqualFormData ? 'Редактировать' : 'Сохранить')
    }, [isEqualFormData])
  

    

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {user.name}!</h2>
      <form className="profile__form">
        <div className="profile__row">
          <label className="profile__label">Имя</label>
          <input
            defaultValue={formData.name}
            onChange={handleChangeFormData}
            type="text"
            className="profile__input"
            name="name"
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div className="profile__row">
          <label className="profile__label">E-mail</label>
          <input
            defaultValue={formData.email}
            onChange={handleChangeFormData}
            type="email"
            className="profile__input"
            name="email"
            required
          />
        </div>
      </form>
      <span className="error">
        {error}
      </span>
      <button className={`${!isEqualFormData ? 'profile__save-btn' : 'profile__confirm-btn'}`} disabled={error} onClick={handleSubmitForm}>{btnText}</button>
      <button className={`profile__exit-btn ${!isEqualFormData ? 'profile__exit-btn_disabled' : ''}`} onClick={handleLogOut}>Выйти из аккаунта</button>

    </section>
  )
};

export default Profile;