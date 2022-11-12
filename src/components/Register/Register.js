import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { EMAIL_ERR_MESSAGE } from "../../utils/constants";
import { emailValidation } from "../../utils/emailValidation";
import Form from "../Form/Form";
import Logo from "../Logo/Logo.js";

function Register({
  onRegister,
  apiError,
  handleClearError,
  isLoading,
  loggedIn,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState(false);
  const isEmailValid = emailValidation(formData.email);
  const [isInputsValid, setIsInputsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setIsInputsValid(e.target.closest("form").checkValidity());
    setIsTouched(true);

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

  useEffect(() => {
    if (isTouched) {
      setErrors({
        ...errors,
        email: !isEmailValid ? EMAIL_ERR_MESSAGE : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailValid, isTouched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      onRegister(formData);
    }
  };

  return (
    <>
      {loggedIn ? (
        <Redirect to={"/"} />
      ) : (
        <section className="form">
          <Logo className="logo logo_type_aligned" />
          <h2 className="form__title">Добро пожаловать!</h2>
          <Form
            formData={formData}
            btnText="Зарегестрироваться"
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            apiError={apiError}
            isLoading={isLoading}
            isInputsValid={isInputsValid}
          />
          <p className="form__question">
            Уже зарегистрированы?{" "}
            <Link
              to="/signin"
              className="form__link"
              onClick={handleClearError}
            >
              Войти
            </Link>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
