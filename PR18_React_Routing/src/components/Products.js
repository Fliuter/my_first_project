import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialProducts = [
  { id: 1, name: 'Ноутбук', price: 65000, category: 'electronics', description: 'Универсальный ноутбук для учёбы, работы и повседневных задач.', icon: '💻' },
  { id: 2, name: 'Смартфон', price: 38000, category: 'electronics', description: 'Современный смартфон с ярким экраном и хорошей камерой.', icon: '📱' },
  { id: 3, name: 'Книга', price: 1200, category: 'books', description: 'Полезная книга для расширения кругозора и саморазвития.', icon: '📚' },
  { id: 4, name: 'Наушники', price: 4500, category: 'electronics', description: 'Удобные наушники для музыки, общения и учёбы.', icon: '🎧' },
  { id: 5, name: 'Футболка', price: 1500, category: 'clothing', description: 'Базовая хлопковая футболка на каждый день.', icon: '👕' }
];

export default function Products() {
  const [filter, setFilter] = useState('all');
  const products = useMemo(() => filter === 'all' ? initialProducts : initialProducts.filter(item => item.category === filter), [filter]);
  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">КАТАЛОГ</p><h1>Наши товары</h1><p>Выберите товар, чтобы открыть страницу с подробной информацией.</p></div></div>
      <div className="filters" aria-label="Фильтр товаров">
        <button className={filter === 'all' ? 'filter active' : 'filter'} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'electronics' ? 'filter active' : 'filter'} onClick={() => setFilter('electronics')}>Электроника</button>
        <button className={filter === 'books' ? 'filter active' : 'filter'} onClick={() => setFilter('books')}>Книги</button>
        <button className={filter === 'clothing' ? 'filter active' : 'filter'} onClick={() => setFilter('clothing')}>Одежда</button>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <article className="product-card" key={product.id}>
            <div className="product-icon">{product.icon}</div>
            <p className="product-category">{product.category === 'electronics' ? 'ЭЛЕКТРОНИКА' : product.category === 'books' ? 'КНИГИ' : 'ОДЕЖДА'}</p>
            <h2>{product.name}</h2>
            <p className="product-price">{product.price.toLocaleString('ru-RU')} ₽</p>
            <Link className="button secondary full" to={`/products/${product.id}`}>Подробнее</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
