import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

export default function App() {
  return (
    <main className="container">
      <header className="page-header">
        <p className="eyebrow">Практическая работа №17</p>
        <h1>React: работа с формами</h1>
        <p>Управляемые компоненты, валидация и useRef</p>
      </header>

      <section className="panel">
        <h2>Задание 1. Базовая форма регистрации</h2>
        <UserRegistrationForm />
      </section>

      <section className="panel">
        <h2>Задание 2. Регистрация с валидацией</h2>
        <UserRegistrationFormWithValidation />
      </section>

      <section className="panel">
        <h2>Задание 3. Неуправляемая форма обратной связи</h2>
        <ContactFormUncontrolled />
      </section>
      <footer>ПР №17 · React Forms</footer>
    </main>
  );
}
