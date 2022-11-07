import { useContext, useEffect, useState } from "react";
import { isEqual } from "../../utils/isEqual";
import { ERRORS } from "../../utils/constants";
import { updateUserData } from "../../utils/MainApi";
import { ToastContainer, toast } from "react-toastify";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleLogOut, onUpdateUser }) {
  const [btnText, setBtnText] = useState("Редактировать");
  const [isTouched, setIsTouched] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [isEqualFormData, setIsEqualFormData] = useState(true);
  const [formData, setFormData] = useState(currentUser);
  const [error, setError] = useState("");

  const handleChangeFormData = (e) => {
    setIsTouched(true);
    const { name, value, validationMessage } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setError(validationMessage);
  };

  const handleSubmitForm = (e) => {
    updateUserData(formData.name, formData.email)
      .then((data) => {
        setFormData(data);
        onUpdateUser(data);
        toast.success("Сохранено!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
      })
      .catch((err) => {
        if (err.status === 409) {
          setError(ERRORS.EMAIL_EXIST_ERROR);
        } else {
          setError(ERRORS.PROFILE.SERVER_ERROR);
        }
      });
  };

  useEffect(() => {
    if (isTouched) {
      setIsEqualFormData(isEqual(formData, currentUser));
    }
  }, [formData, isTouched, currentUser]);

  useEffect(() => {
    setBtnText(isEqualFormData ? "Редактировать" : "Сохранить");
  }, [isEqualFormData]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
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
      <span className="input-error">{error}</span>
      <button
        className={`${
          !isEqualFormData ? "profile__save-btn" : "profile__confirm-btn "
        }`}
        disabled={error}
        onClick={handleSubmitForm}
      >
        {btnText}
      </button>
      <button
        className={`profile__exit-btn ${
          !isEqualFormData ? "profile__exit-btn_disabled" : ""
        }`}
        onClick={handleLogOut}
      >
        Выйти из аккаунта
      </button>
      <ToastContainer />
    </section>
  );
}

export default Profile;
