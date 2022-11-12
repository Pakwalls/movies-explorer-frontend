import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { isEqual } from "../../utils/isEqual";
import {
  EMAIL_ERR_MESSAGE,
  ERRORS,
  NAME_BTN_EDIT,
  NAME_BTN_SAVE,
  NAME_MSG_SUCCESS,
} from "../../utils/constants";
import { updateUserData } from "../../utils/MainApi";
import { ToastContainer, toast } from "react-toastify";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEmailValidation } from "../../utils/useEmailValidatation";

function Profile({ handleLogOut, onUpdateUser }) {
  // const [btnText, setBtnText] = useState(NAME_BTN_EDIT);
  const [isTouched, setIsTouched] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [isEqualFormData, setIsEqualFormData] = useState(true);
  const [formData, setFormData] = useState(useContext(CurrentUserContext));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const isEmailValid = useEmailValidation(formData.email);

  const handleChangeFormData = (e) => {
    setIsTouched(true);
    const { name, value, validationMessage } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    if (name !== "email") {
      setError(validationMessage || "");
    }
  };

  const handleSubmitForm = (e) => {
    if (!isLoading && !isEqualFormData) {
      setIsLoading(true);
      updateUserData(formData.name, formData.email)
        .then((data) => {
          setFormData(data);
          onUpdateUser(data);
          toast.success(NAME_MSG_SUCCESS, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
          });
          setIsEdit(false);
        })
        .catch((err) => {
          if (err.status === 409) {
            setError(ERRORS.EMAIL_EXIST_ERROR);
          } else {
            setError(ERRORS.PROFILE.SERVER_ERROR);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleEditForm = () => {
    setIsEdit(true);
    setIsTouched(true);
  };

  useEffect(() => {
    if (isTouched) {
      setError(!isEmailValid ? EMAIL_ERR_MESSAGE : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailValid, isTouched]);

  useEffect(() => {
    if (isTouched) {
      setIsEqualFormData(isEqual(formData, currentUser));
    }
  }, [formData, isTouched, currentUser]);

  useEffect(() => {
    setFormData(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  // useEffect(() => {
  //   setBtnText(isEqualFormData ? NAME_BTN_EDIT : NAME_BTN_SAVE);
  // }, [isEqualFormData]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmitForm}>
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
            disabled={!isEdit}
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
            disabled={!isEdit}
            required
          />
        </div>
      </form>
      <span className="input-error">{error}</span>

      {isEdit ? (
        <button
          type="submit"
          className="profile__confirm-btn"
          onClick={handleSubmitForm}
          disabled={error || isLoading || isEqualFormData}
        >
          {NAME_BTN_SAVE}
        </button>
      ) : (
        <button className="profile__edit-btn" onClick={handleEditForm}>
          {NAME_BTN_EDIT}
        </button>
      )}
      {/* <button
        className={`${
          !isEqualFormData ? "profile__save-btn" : "profile__confirm-btn"
        }`}
        disabled={error || isLoading}
        onClick={handleSubmitForm}
      >
        {btnText}
      </button> */}
      <button
        className={`profile__exit-btn ${
          isEdit ? "profile__exit-btn_disabled" : ""
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
