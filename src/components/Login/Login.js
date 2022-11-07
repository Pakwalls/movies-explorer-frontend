import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EMAIL_ERR_MESSAGE } from "../../utils/constants";
import { useEmailValidation } from "../../utils/useEmailValidatation";
import Form from "../Form/Form";
import Logo from "../Logo/Logo.js";

function Login({ onLogin, apiError, handleClearError, isLoading }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState(false);
  const isEmailValid = useEmailValidation(formData.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsTouched(true);

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name !== "email") {
      setErrors({
        ...errors,
        [name]: e.target.validationMessage || "",
      });
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
      onLogin(formData);
    }
  };

  return (
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
        isLogin
      />
      <p className="form__question">
        Ещё не зарегистрированы?{" "}
        <Link to="/signup" className="form__link" onClick={handleClearError}>
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
