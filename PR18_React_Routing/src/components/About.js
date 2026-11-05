import React from 'react';

export default function About() {
  return (
    <section className="page-card">
      <p className="eyebrow">ИНФОРМАЦИЯ</p>
      <h1>О проекте</h1>
      <p>Это учебное одностраничное приложение создано для практической работы №18 «React: маршрутизация».</p>
      <p>В проекте используется React Router. Он позволяет менять отображаемую страницу без полной перезагрузки браузера.</p>
      <div className="info-list">
        <div><strong>BrowserRouter</strong><span>Оборачивает приложение и отслеживает адрес.</span></div>
        <div><strong>Routes и Route</strong><span>Сопоставляют URL с React-компонентами.</span></div>
        <div><strong>Link и NavLink</strong><span>Создают ссылки для перехода между страницами.</span></div>
      </div>
    </section>
  );
}
