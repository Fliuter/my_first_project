import React, { useState } from 'react';

export default function ComponentTests(){
  const [results,setResults]=useState(null);
  const runTests=()=>{
    const checks=[
      {name:'Базовые компоненты отображаются',passed:!!document.querySelector('#basic-output-1 .component-demo')},
      {name:'Компоненты с состоянием отображаются',passed:!!document.querySelector('#stateful-output-1 .component-demo')},
      {name:'Компоненты Hooks отображаются',passed:!!document.querySelector('#hooks-output-1 .component-demo')},
      {name:'Кнопки и элементы управления доступны',passed:document.querySelectorAll('button').length>=8}
    ];
    setResults(checks);
  };
  return <section className="task-section"><h2>Часть 5. Тестирование компонентов</h2>
    <p>Проверка наличия основных групп компонентов на странице.</p>
    <button onClick={runTests}>Запустить тесты компонентов</button>
    {results&&<div className="output"><h3>Результаты тестирования</h3>{results.map((t,i)=><p key={i} className={t.passed?'test-pass':'test-fail'}>{t.passed?'✓':'✗'} {t.name}</p>)}<strong>Пройдено: {results.filter(t=>t.passed).length}/{results.length}</strong></div>}
    <h3>Инструкция по проверке</h3><ul><li>Проверьте работу счётчиков и формы.</li><li>Добавьте, отметьте и удалите задачу.</li><li>Измените размер окна браузера.</li><li>Переключите тему и запустите тесты.</li></ul>
  </section>;
}
