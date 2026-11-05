import React, { useState } from 'react';

const initialValues = {
  name: '', email: '', password: '', confirmPassword: '',
  gender: '', newsletter: false, age: '', about: ''
};

export default function UserRegistrationFormWithValidation() {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setSubmitted(false);
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Введите имя.';
    if (!form.email.trim()) next.email = 'Введите email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Введите корректный email.';
    if (!form.password) next.password = 'Введите пароль.';
    else if (form.password.length < 8) next.password = 'Пароль должен содержать минимум 8 символов.';
    if (!form.confirmPassword) next.confirmPassword = 'Подтвердите пароль.';
    else if (form.password !== form.confirmPassword) next.confirmPassword = 'Пароли не совпадают.';
    if (!form.gender) next.gender = 'Выберите пол.';
    if (!form.age) next.age = 'Выберите возраст.';
    if (!form.about.trim()) next.about = 'Заполните поле «О себе».';
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="field">
        <label htmlFor="valid-name">Имя</label>
        <input id="valid-name" name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>
      <div className="field">
        <label htmlFor="valid-email">Email</label>
        <input id="valid-email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>
      <div className="field">
        <label htmlFor="valid-password">Пароль</label>
        <input id="valid-password" name="password" type="password" value={form.password} onChange={handleChange} aria-invalid={!!errors.password} />
        {errors.password && <small className="error">{errors.password}</small>}
      </div>
      <div className="field">
        <label htmlFor="valid-confirm">Подтверждение пароля</label>
        <input id="valid-confirm" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} aria-invalid={!!errors.confirmPassword} />
        {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
      </div>
      <fieldset className="field">
        <legend>Пол</legend>
        <label className="choice"><input type="radio" name="gender" value="Мужской" checked={form.gender === 'Мужской'} onChange={handleChange} /> Мужской</label>
        <label className="choice"><input type="radio" name="gender" value="Женский" checked={form.gender === 'Женский'} onChange={handleChange} /> Женский</label>
        {errors.gender && <small className="error">{errors.gender}</small>}
      </fieldset>
      <label className="choice"><input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} /> Подписаться на рассылку</label>
      <div className="field">
        <label htmlFor="valid-age">Возраст</label>
        <select id="valid-age" name="age" value={form.age} onChange={handleChange}>
          <option value="">Выберите возраст</option>
          {Array.from({ length: 8 }, (_, i) => 16 + i).map(age => <option key={age} value={age}>{age}</option>)}
          <option value="24+">24 и старше</option>
        </select>
        {errors.age && <small className="error">{errors.age}</small>}
      </div>
      <div className="field">
        <label htmlFor="valid-about">О себе</label>
        <textarea id="valid-about" name="about" rows="3" value={form.about} onChange={handleChange} />
        {errors.about && <small className="error">{errors.about}</small>}
      </div>
      <button type="submit">Проверить и отправить</button>
      {submitted && <p className="success">Регистрация прошла проверку успешно!</p>}
    </form>
  );
}
