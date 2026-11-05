import React from 'react';
import BasicHooks from './components/BasicHooks';
import AdvancedHooks from './components/AdvancedHooks';
import CustomHooks from './components/CustomHooks';
import HooksTests from './components/HooksTests';

export default function App() {
  return <div className="page"><header><h1>Практическая работа №16: React Hooks</h1><p>Изучение встроенных и пользовательских хуков React</p></header><main><BasicHooks /><AdvancedHooks /><CustomHooks /><HooksTests /></main><footer className="muted"><p>ПР №16 · React · useState, useEffect, useReducer, useContext, useMemo, useCallback, useRef</p></footer></div>;
}
