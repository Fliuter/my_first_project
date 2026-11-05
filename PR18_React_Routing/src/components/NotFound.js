import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-card center-card">
      <p className="error-code">404</p>
      <h1>Страница не найдена</h1>
      <p>Возможно, адрес введён неправильно или страница была перемещена.</p>
      <Link className="button primary" to="/">Вернуться на главную</Link>
    </section>
  );
}
