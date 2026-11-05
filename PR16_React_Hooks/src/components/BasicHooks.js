import React, { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <div className="demo"><h3>Счётчик: {count}</h3><button onClick={() => setCount(value => value + 1)}>+1</button><button onClick={() => setCount(value => value - 1)}>-1</button><button onClick={() => setCount(0)}>Сброс</button></div>;
}

function UserForm() {
  const [user, setUser] = useState({ name: '', email: '', age: '' });
  const handleChange = event => setUser(current => ({ ...current, [event.target.name]: event.target.value }));
  return <div className="demo"><h3>Форма пользователя</h3>
    <input name="name" placeholder="Имя" value={user.name} onChange={handleChange} />
    <input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} />
    <input name="age" type="number" placeholder="Возраст" value={user.age} onChange={handleChange} />
    <p>Имя: {user.name || '—'} · Email: {user.email || '—'} · Возраст: {user.age || '—'}</p>
  </div>;
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const addTodo = () => { const text = input.trim(); if (!text) return; setTodos(items => [...items, { id: Date.now(), text, completed: false }]); setInput(''); };
  const visible = todos.filter(todo => filter === 'all' || (filter === 'active' ? !todo.completed : todo.completed));
  return <div className="demo"><h3>Список задач</h3><div className="row"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} placeholder="Новая задача" /><button onClick={addTodo}>Добавить</button></div>
    <div className="row"><button onClick={() => setFilter('all')}>Все</button><button onClick={() => setFilter('active')}>Активные</button><button onClick={() => setFilter('completed')}>Завершённые</button></div>
    <ul>{visible.map(todo => <li key={todo.id}><label><input type="checkbox" checked={todo.completed} onChange={() => setTodos(items => items.map(item => item.id === todo.id ? { ...item, completed: !item.completed } : item))} /> <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span></label> <button onClick={() => setTodos(items => items.filter(item => item.id !== todo.id))}>Удалить</button></li>)}</ul>
    {todos.length === 0 && <p className="muted">Пока задач нет.</p>}
  </div>;
}

function Timer() {
  const [time, setTime] = useState(0); const [running, setRunning] = useState(false);
  useEffect(() => { if (!running) return undefined; const id = setInterval(() => setTime(value => value + 1), 1000); return () => clearInterval(id); }, [running]);
  return <div className="demo"><h3>Таймер: {time} сек.</h3><button onClick={() => setRunning(value => !value)}>{running ? 'Пауза' : 'Старт'}</button><button onClick={() => { setRunning(false); setTime(0); }}>Сброс</button></div>;
}

function WindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => { const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight }); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
  return <div className="demo"><h3>Размер окна</h3><p>Ширина: {size.width}px · Высота: {size.height}px</p></div>;
}

function DataFetcher() {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  const load = async () => { setLoading(true); setError(''); try { const response = await fetch('https://jsonplaceholder.typicode.com/users/1'); if (!response.ok) throw new Error(`HTTP ${response.status}`); setData(await response.json()); } catch (err) { setError(`Не удалось загрузить данные: ${err.message}`); } finally { setLoading(false); } };
  useEffect(() => { const controller = new AbortController(); (async () => { setLoading(true); try { const response = await fetch('https://jsonplaceholder.typicode.com/users/1', { signal: controller.signal }); if (!response.ok) throw new Error(`HTTP ${response.status}`); setData(await response.json()); } catch (err) { if (err.name !== 'AbortError') setError(err.message); } finally { if (!controller.signal.aborted) setLoading(false); } })(); return () => controller.abort(); }, []);
  return <div className="demo"><h3>Загрузка данных</h3><button onClick={load} disabled={loading}>Обновить данные</button>{loading && <p>Загрузка...</p>}{error && <p className="error">{error}</p>}{data && <p>Имя: {data.name} · Email: {data.email} · Телефон: {data.phone}</p>}</div>;
}

export default function BasicHooks() { return <section className="section"><h2>Базовые хуки: useState и useEffect</h2><Counter /><UserForm /><TodoList /><Timer /><WindowSize /><DataFetcher /></section>; }
