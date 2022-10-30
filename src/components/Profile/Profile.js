import { useEffect, useState } from "react";

function Profile({ userName, email, handleLogOut }) {
  const [btnText, setBtnText] = useState('Редактировать');
  const [formDisabled, setFormDisabled] = useState(true);

  const handleFormDisable = () => {
    setFormDisabled(!formDisabled)
  }
  
  useEffect(() =>{
    setBtnText(formDisabled ? 'Редактировать' : 'Сохранить')
  }, [formDisabled])

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {userName}!</h2>
      <form className="profile__form">
        <div className="profile__row">
          <label className="profile__label">Имя</label>
          <input
            defaultValue={userName}
            type="text"
            className="profile__input"
            name="name"
            minLength="2"
            maxLength="30"
            required
            disabled={formDisabled}
            
          />
        </div>
        <div className="profile__row">
          <label className="profile__label">E-mail</label>
          <input
            defaultValue={email}
            type="email"
            className="profile__input"
            name="email"
            disabled={formDisabled}
            required
          />
        </div>
      </form>
      <button className="profile__confirm-btn" onClick={handleFormDisable}>{btnText}</button>
      <button className="profile__exit-btn" onClick={handleLogOut}>Выйти из аккаунта</button>
    </section>
  )
};

export default Profile;