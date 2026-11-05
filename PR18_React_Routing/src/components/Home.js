import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">ПРАКТИЧЕСКАЯ РАБОТА №18</p>
      <h1>Маршрутизация<br /><span>в React</span></h1>
      <p className="hero-text">Небольшое SPA-приложение, демонстрирующее переходы между страницами, динамические URL и программную навигацию.</p>
      <div className="actions">
        <Link className="button primary" to="/products">Открыть каталог</Link>
        <Link className="button secondary" to="/about">О проекте</Link>
      </div>
      <div className="feature-grid">
        <article className="feature-card"><span>01</span><h3>Маршруты</h3><p>Routes, Route, BrowserRouter и навигация по страницам.</p></article>
        <article className="feature-card"><span>02</span><h3>Параметры URL</h3><p>Динамические страницы товаров с помощью useParams.</p></article>
        <article className="feature-card"><span>03</span><h3>Переходы</h3><p>useNavigate и передача состояния между маршрутами.</p></article>
      </div>
    </section>
  );
}
