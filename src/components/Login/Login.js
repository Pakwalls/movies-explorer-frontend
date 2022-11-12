import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { EMAIL_ERR_MESSAGE } from "../../utils/constants";
import { emailValidation } from "../../utils/emailValidation";
import Form from "../Form/Form";
import Logo from "../Logo/Logo.js";

function Login({ onLogin, apiError, handleClearError, isLoading, loggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isInputsValid, setIsInputsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setIsInputsValid(e.target.closest("form").checkValidity());

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email" && (!validationMessage || validationMessage === "")) {
      const isEmailValid = emailValidation(value);

      if (isEmailValid) {
        setErrors({ ...errors, email: "" });
      } else {
        setErrors({ ...errors, email: EMAIL_ERR_MESSAGE });
      }
    } else {
      setErrors({ ...errors, [name]: validationMessage });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      onLogin(formData);
    }
  };

  return (
    <>
      {loggedIn ? (
        <Redirect to={"/"} />
      ) : (
        <section className="form">
          <Logo className="logo logo_type_aligned" />
          <h2 className="form__title">Рады видеть!</h2>
          <Form
            formData={formData}
            btnText="Войти"
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            apiError={apiError}
            isLoading={isLoading}
            isInputsValid={isInputsValid}
            isLogin
          />
          <p className="form__question">
            Ещё не зарегистрированы?{" "}
            <Link
              to="/signup"
              className="form__link"
              onClick={handleClearError}
            >
              Регистрация
            </Link>
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
