import React, { useState } from 'react';
import './BasicComponents.css';

export function WelcomeMessage({ name, age }) {
  return <p>Привет, {name}! Тебе {age} лет.</p>;
}
export function UserCard({ user }) {
  return <div className="user-card">
    <img className="avatar" src={user.avatar || 'https://via.placeholder.com/48'} alt="Аватар" />
    <div><strong>{user.name}</strong><div>{user.email}</div>
      <small className={user.isOnline ? 'online' : 'offline'}>{user.isOnline ? '● В сети' : '○ Не в сети'}</small>
    </div>
  </div>;
}
export function Button({ variant='primary', size='medium', onClick, children }) {
  return <button className={variant === 'secondary' ? 'secondary' : ''} style={{fontSize:size==='small'?'.8rem':size==='large'?'1.15rem':'1rem'}} onClick={onClick}>{children}</button>;
}
export function Card({ title, children }) {
  return <div className="component-demo"><h3>{title}</h3>{children}</div>;
}
export function Toggle({ children }) {
  const [open,setOpen] = useState(false);
  return <div><button onClick={()=>setOpen(v=>!v)}>{open?'Скрыть':'Показать'}</button>{open && <div className="output">{children}</div>}</div>;
}
export function ConditionalMessage({ status, children }) {
  const type = ['success','error','warning'].includes(status) ? status : 'warning';
  return <div className={`message ${type}`}>{children || ({success:'Операция выполнена успешно',error:'Произошла ошибка',warning:'Обратите внимание'}[type])}</div>;
}

export default function BasicComponents() {
  const [clicks,setClicks] = useState(0);
  const user = {name:'Иван Петров',email:'ivan@example.com',avatar:'',isOnline:true};
  return <section className="task-section" id="basic-output-1">
    <h2>Часть 2. Базовые компоненты</h2>
    <Card title="Функциональные компоненты и props">
      <WelcomeMessage name="Иван" age={18} />
      <UserCard user={user} />
      <Button onClick={()=>setClicks(v=>v+1)}>Нажми меня</Button>
      <Button variant="secondary" size="small" onClick={()=>setClicks(0)}>Сбросить</Button>
      <p>Нажатий: {clicks}</p>
    </Card>
    <Card title="Children и условный рендеринг">
      <Toggle>Этот текст появляется и скрывается по нажатию кнопки.</Toggle>
      <ConditionalMessage status="success" />
      <ConditionalMessage status="warning" />
      <ConditionalMessage status="error" />
    </Card>
  </section>;
}
