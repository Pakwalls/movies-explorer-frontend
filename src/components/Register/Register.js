import { useState } from "react"
import { Link } from 'react-router-dom';
import Form from "../Form/Form";
import Logo from '../Logo/Logo.js'

function Register({ handleSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value, } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: e.target.validationMessage || '',
    })
  }

  return (
    <section className='form'>
      <Logo className='logo logo_type_aligned' />
      <h2 className="form__title">Добро пожаловать!</h2>
      <Form
        formData={formData}
        btnText="Зарегестрироваться"
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <p className="form__question">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
    </section>
  )
}

export default Register