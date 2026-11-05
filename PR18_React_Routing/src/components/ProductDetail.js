import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const products = {
  1: { name: 'Ноутбук', price: 65000, category: 'Электроника', description: 'Универсальный ноутбук для учёбы, работы и повседневных задач.', icon: '💻' },
  2: { name: 'Смартфон', price: 38000, category: 'Электроника', description: 'Современный смартфон с ярким экраном и хорошей камерой.', icon: '📱' },
  3: { name: 'Книга', price: 1200, category: 'Книги', description: 'Полезная книга для расширения кругозора и саморазвития.', icon: '📚' },
  4: { name: 'Наушники', price: 4500, category: 'Электроника', description: 'Удобные наушники для музыки, общения и учёбы.', icon: '🎧' },
  5: { name: 'Футболка', price: 1500, category: 'Одежда', description: 'Базовая хлопковая футболка на каждый день.', icon: '👕' }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products[id];
  if (!product) return <section className="page-card"><h1>Товар не найден</h1><p>Товара с ID {id} не существует.</p><button className="button primary" onClick={() => navigate('/products')}>Вернуться в каталог</button></section>;
  return (
    <section className="page-card detail-card">
      <button className="text-button" onClick={() => navigate('/products')}>← Назад к товарам</button>
      <div className="detail-layout"><div className="detail-icon">{product.icon}</div><div>
        <p className="eyebrow">{product.category.toUpperCase()} · ID {id}</p>
        <h1>{product.name}</h1><p>{product.description}</p>
        <p className="detail-price">{product.price.toLocaleString('ru-RU')} ₽</p>
        <button className="button primary" onClick={() => navigate('/contact', { state: { productName: product.name, productId: id } })}>Задать вопрос о товаре</button>
      </div></div>
      <p className="muted">Страница товара сформирована динамически: идентификатор получен из URL с помощью useParams().</p>
      <Link to="/products">Вернуться в каталог</Link>
    </section>
  );
}
