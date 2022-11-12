import { useEffect } from "react";
import { useState } from "react";

function Form({
  formData,
  handleChange,
  handleSubmit,
  errors,
  btnText,
  apiError,
  isLoading,
  isInputsValid,
  isLogin = false,
}) {
  const [isError, setIsError] = useState(errors);

  useEffect(() => {
    const hasError = Object.values(errors).filter((err) => err);

    setIsError(hasError.length !== 0);
  }, [errors]);

  return (
    <form className="form__plate" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        {!isLogin && (
          <>
            <label htmlFor="form__name" className="form__label">
              Имя
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              id="name-input"
              className="form__input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__error">{errors.name}</span>
          </>
        )}
        <label htmlFor="email" className="form__label">
          E-mail
        </label>
        <input
          value={formData.email}
          onChange={handleChange}
          id="email-input"
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <span className="form__error">{errors.email}</span>
        <label htmlFor="password" className="form__label">
          Пароль
        </label>
        <input
          value={formData.password}
          onChange={handleChange}
          id="password-input"
          className="form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <span className="form__error">{errors.password}</span>
        <span className="form__input-error">{apiError}</span>
      </fieldset>
      <button
        type="submit"
        className={`form__submit-button ${
          isError || isLoading || !isInputsValid
            ? "form__submit-button_disabled"
            : ""
        } hovered-item`}
        disabled={isError || isLoading || !isInputsValid}
      >
        {btnText}
      </button>
    </form>
  );
}

export default Form;
