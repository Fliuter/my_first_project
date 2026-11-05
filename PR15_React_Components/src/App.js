import React from 'react';
import BasicComponents from './components/basic/BasicComponents';
import StatefulComponents from './components/stateful/StatefulComponents';
import LifecycleComponents from './components/lifecycle/LifecycleComponents';
import HooksComponents from './components/hooks/HooksComponents';
import ComponentTests from './components/ComponentTests';

export default function App() {
  return <div className="App">
    <header className="App-header">
      <h1>Практическая работа №15: React-компоненты</h1>
      <p>Демонстрация функциональных и классовых компонентов, состояния и хуков</p>
    </header>
    <main className="App-main">
      <BasicComponents />
      <StatefulComponents />
      <LifecycleComponents />
      <HooksComponents />
      <ComponentTests />
    </main>
    <footer>ПР №15 · React · JSX · Hooks</footer>
  </div>;
}
