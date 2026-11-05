import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ContactSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  return (
    <section className="page-card center-card success-card">
      <div className="success-mark">✓</div>
      <p className="eyebrow">ГОТОВО</p><h1>Сообщение подготовлено</h1>
      {data ? <><p>Спасибо, <strong>{data.name}</strong>! Данные формы успешно переданы между маршрутами.</p><div className="summary-box"><p><strong>Email:</strong> {data.email}</p><p><strong>Сообщение:</strong> {data.message}</p></div></> : <p>Страница подтверждения открыта напрямую. Заполненные данные не передавались.</p>}
      <div className="actions centered"><button className="button primary" onClick={() => navigate('/contact')}>Новое сообщение</button><Link className="button secondary" to="/">На главную</Link></div>
    </section>
  );
}
