import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: location.state?.productName ? `Здравствуйте! Меня интересует товар: ${location.state.productName}.` : '' });
  const [error, setError] = useState('');

  function handleChange(event) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Введите корректный адрес электронной почты.');
      return;
    }
    setError('');
    navigate('/contact/success', { state: { name: form.name, email: form.email, message: form.message } });
  }

  return (
    <section className="page-card form-card">
      <p className="eyebrow">ОБРАТНАЯ СВЯЗЬ</p><h1>Свяжитесь с нами</h1>
      {location.state?.productName && <p className="notice">Вы спрашиваете о товаре: <strong>{location.state.productName}</strong></p>}
      <form onSubmit={handleSubmit}>
        <label>Ваше имя<input name="name" value={form.name} onChange={handleChange} placeholder="Иван" /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" /></label>
        <label>Сообщение<textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Напишите ваше сообщение" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary" type="submit">Отправить сообщение</button>
      </form>
      <p className="muted">Демонстрационная форма: данные передаются на страницу подтверждения и не отправляются на сервер.</p>
    </section>
  );
}
