import React, { useRef, useState } from 'react';

export default function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!name || !email || !message) {
      setResult('Заполните все поля формы.');
      return;
    }

    setResult(`Спасибо, ${name}! Ваше сообщение подготовлено.`);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label htmlFor="contact-name">Имя</label>
        <input id="contact-name" type="text" ref={nameRef} />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" ref={emailRef} />
      </div>
      <div className="field">
        <label htmlFor="contact-message">Сообщение</label>
        <textarea id="contact-message" rows="4" ref={messageRef} />
      </div>
      <button type="submit">Отправить сообщение</button>
      {result && <p className={result.startsWith('Спасибо') ? 'success' : 'error'}>{result}</p>}
    </form>
  );
}
