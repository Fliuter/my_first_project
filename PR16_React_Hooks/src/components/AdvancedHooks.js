import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, useRef } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': { const found = state.items.find(item => item.id === action.payload.id); return { ...state, items: found ? state.items.map(item => item.id === found.id ? { ...item, quantity: item.quantity + 1 } : item) : [...state.items, { ...action.payload, quantity: 1 }] }; }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': return { ...state, items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item).filter(item => item.quantity > 0) };
    case 'CLEAR_CART': return { items: [] };
    default: return state;
  }
}
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const products = [{ id: 1, name: 'Товар 1', price: 100 }, { id: 2, name: 'Товар 2', price: 200 }, { id: 3, name: 'Товар 3', price: 300 }];
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div className="demo"><h3>Корзина покупок (useReducer)</h3><p>Добавить товар:</p>{products.map(item => <button key={item.id} onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>{item.name} — {item.price} ₽</button>)}
    {state.items.map(item => <div className="row" key={item.id}><span>{item.name}: {item.price} ₽</span><button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>−</button><span>{item.quantity}</span><button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button><button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Удалить</button></div>)}
    <strong>Итого: {total} ₽</strong> <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Очистить корзину</button>
  </div>;
}

function stopwatchReducer(state, action) { switch (action.type) { case 'START': return { ...state, isRunning: true }; case 'STOP': return { ...state, isRunning: false }; case 'RESET': return { isRunning: false, time: 0, laps: [] }; case 'TICK': return { ...state, time: state.time + 1 }; case 'LAP': return { ...state, laps: [...state.laps, state.time] }; default: return state; } }
function Stopwatch() {
  const [state, dispatch] = useReducer(stopwatchReducer, { isRunning: false, time: 0, laps: [] });
  useEffect(() => { if (!state.isRunning) return undefined; const id = setInterval(() => dispatch({ type: 'TICK' }), 1000); return () => clearInterval(id); }, [state.isRunning]);
  return <div className="demo"><h3>Секундомер: {state.time} сек.</h3><button onClick={() => dispatch({ type: state.isRunning ? 'STOP' : 'START' })}>{state.isRunning ? 'Стоп' : 'Старт'}</button><button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button><button onClick={() => dispatch({ type: 'LAP' })} disabled={!state.isRunning}>Круг</button>{state.laps.length > 0 && <ol>{state.laps.map((lap, i) => <li key={i}>Круг {i + 1}: {lap} сек.</li>)}</ol>}</div>;
}
function ThemeProvider({ children }) { const [theme, setTheme] = useState('light'); const toggleTheme = useCallback(() => setTheme(value => value === 'light' ? 'dark' : 'light'), []); const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]); return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>; }
function ThemeToggle() { const { theme, toggleTheme } = useContext(ThemeContext); return <div className={`demo ${theme}`}><h3>Тема: {theme}</h3><button onClick={toggleTheme}>Переключить тему</button></div>; }
function ExpensiveCalculation() { const [number, setNumber] = useState(1); const [renders, setRenders] = useState(0); const result = useMemo(() => { let sum = 0; for (let i = 0; i < 500000; i++) sum += number; return sum; }, [number]); useEffect(() => setRenders(value => value + 1), [number]); return <div className="demo"><h3>Сложные вычисления (useMemo)</h3><p>Число: {number} · Результат: {result} · Изменений числа: {renders}</p><button onClick={() => setNumber(value => value + 1)}>Увеличить число</button><button onClick={() => setRenders(0)}>Сбросить счётчик</button></div>; }
function FocusInput() { const inputRef = useRef(null); return <div className="demo"><h3>Фокус на input (useRef)</h3><input ref={inputRef} placeholder="Поле для ввода" /><button onClick={() => inputRef.current?.focus()}>Фокус на input</button></div>; }
function PreviousValue() { const [value, setValue] = useState(''); const previous = useRef(''); useEffect(() => { previous.current = value; }, [value]); return <div className="demo"><h3>Текущее и предыдущее значение</h3><input value={value} onChange={e => setValue(e.target.value)} placeholder="Введите текст" /><p>Текущее: {value}</p><p>Предыдущее: {previous.current}</p></div>; }
function ThemeArea() { return <ThemeProvider><div className="demo"><h3>useContext — доступ к контексту</h3><ThemeToggle /></div></ThemeProvider>; }
export default function AdvancedHooks() { return <section className="section"><h2>Продвинутые хуки</h2><ShoppingCart /><Stopwatch /><ThemeArea /><ExpensiveCalculation /><FocusInput /><PreviousValue /></section>; }
