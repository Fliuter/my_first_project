import React, { useState } from 'react';

export default function HooksTests() {
  const [results, setResults] = useState(null);
  const runTests = () => {
    const checks = [
      { name: 'Базовые хуки подключены', ok: Boolean(document.querySelector('.section')) },
      { name: 'Счётчик отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Счётчик')) },
      { name: 'Список задач отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Список задач')) },
      { name: 'Таймер отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Таймер')) },
      { name: 'Корзина отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Корзина')) },
      { name: 'Секундомер отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Секундомер')) },
      { name: 'Тема отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Тема')) },
      { name: 'Фокусируемое поле отображается', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('Фокус на input')) },
      { name: 'Кастомные хуки отображаются', ok: [...document.querySelectorAll('h3')].some(node => node.textContent.includes('useDebounce')) },
      { name: 'Есть кнопки управления', ok: document.querySelectorAll('button').length >= 10 }
    ];
    setResults(checks);
  };
  const passed = results?.filter(item => item.ok).length ?? 0;
  return <section className="section"><h2>Тестирование хуков</h2><p>Нажмите кнопку, чтобы проверить наличие основных демонстрационных компонентов.</p><button onClick={runTests}>Запустить тесты</button>{results && <><h3>Результат: {passed} из {results.length}</h3><ul>{results.map((item, index) => <li className={item.ok ? 'success' : 'error'} key={index}>{item.ok ? '✓' : '✗'} {item.name}</li>)}</ul></>}</section>;
}
