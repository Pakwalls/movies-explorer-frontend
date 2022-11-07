import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmailValidation } from "../../utils/useEmailValidatation";
import Form from "../Form/Form";
import Logo from "../Logo/Logo.js";

function Register({ onRegister, apiError, handleClearError }) {
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
        email: !isEmailValid ? "Введено некоректное значение в поле Email" : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailValid, isTouched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
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
      />
      <p className="form__question">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="form__link" onClick={handleClearError}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
