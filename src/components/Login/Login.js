import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Logo from "../Logo/Logo.js";

function Login({ onLogin, apiError, handleClearError }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
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
