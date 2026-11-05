import React, { useState } from 'react';

const initialValues = {
  name: '', email: '', password: '', confirmPassword: '',
  gender: '', newsletter: false, age: '', about: ''
};

export default function UserRegistrationForm() {
  const [form, setForm] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label htmlFor="basic-name">Имя</label>
        <input id="basic-name" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="basic-email">Email</label>
        <input id="basic-email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="basic-password">Пароль</label>
        <input id="basic-password" name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="basic-confirm">Подтверждение пароля</label>
        <input id="basic-confirm" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
      </div>
      <fieldset className="field">
        <legend>Пол</legend>
        <label className="choice"><input type="radio" name="gender" value="Мужской" checked={form.gender === 'Мужской'} onChange={handleChange} required /> Мужской</label>
        <label className="choice"><input type="radio" name="gender" value="Женский" checked={form.gender === 'Женский'} onChange={handleChange} /> Женский</label>
      </fieldset>
      <label className="choice"><input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} /> Подписаться на рассылку</label>
      <div className="field">
        <label htmlFor="basic-age">Возраст</label>
        <select id="basic-age" name="age" value={form.age} onChange={handleChange} required>
          <option value="">Выберите возраст</option>
          {Array.from({ length: 8 }, (_, i) => 16 + i).map(age => <option key={age} value={age}>{age}</option>)}
          <option value="24+">24 и старше</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="basic-about">О себе</label>
        <textarea id="basic-about" name="about" rows="3" value={form.about} onChange={handleChange} required />
      </div>
      <button type="submit">Отправить</button>
      {submitted && <p className="success">Форма отправлена. Данные обработаны на стороне браузера.</p>}
    </form>
  );
}
