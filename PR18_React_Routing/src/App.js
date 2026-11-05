import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <NavLink to="/" className="brand">ROUTE<span>LAB</span></NavLink>
          <nav className="navigation" aria-label="Основная навигация">
            <NavLink to="/" end>Главная</NavLink>
            <NavLink to="/about">О проекте</NavLink>
            <NavLink to="/products">Товары</NavLink>
            <NavLink to="/contact">Контакты</NavLink>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/success" element={<ContactSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">Практическая работа №18 · React Router</footer>
      </div>
    </BrowserRouter>
  );
}
