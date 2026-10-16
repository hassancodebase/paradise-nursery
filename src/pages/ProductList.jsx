import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Leaf, ShoppingBag } from 'lucide-react';
import { plantCategories } from '../data/plants.js';
import { addToCart, selectCartItems } from '../features/cart/CartSlice.jsx';

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const addedIds = new Set(cartItems.map((item) => item.id));
  const visibleCategories = activeCategory === 'all'
    ? plantCategories
    : plantCategories.filter((category) => category.id === activeCategory);

  return (
    <main className="page-shell">
      <section className="catalog-intro">
        <div>
          <p className="eyebrow">THE HOUSEPLANT EDIT</p>
          <h1>Find your <em>kind of green.</em></h1>
          <p className="intro-copy">Leafy companions for every room, routine, and level of plant-parent confidence.</p>
        </div>
        <div className="catalog-note"><Leaf size={20} /><span>Grown for good living</span></div>
      </section>

      <div className="category-filter" aria-label="Filter plant categories">
        <button className={activeCategory === 'all' ? 'filter-pill active' : 'filter-pill'} onClick={() => setActiveCategory('all')}>All plants</button>
        {plantCategories.map((category) => (
          <button key={category.id} className={activeCategory === category.id ? 'filter-pill active' : 'filter-pill'} onClick={() => setActiveCategory(category.id)}>{category.name}</button>
        ))}
      </div>

      {visibleCategories.map((category) => (
        <section className="plant-category" key={category.id}>
          <div className="section-heading">
            <div><p className="eyebrow">CURATED COLLECTION</p><h2>{category.name}</h2><p>{category.description}</p></div>
            <span className="collection-count">{category.plants.length.toString().padStart(2, '0')} PLANTS</span>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant, index) => {
              const added = addedIds.has(plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-image-wrap">
                    <img src={plant.image} alt={plant.name} loading="lazy" />
                    <span className="plant-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="plant-tag">{plant.tag}</span>
                  </div>
                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>
                    <div className="plant-card-bottom">
                      <span className="plant-price">${plant.price.toFixed(2)}</span>
                      <button className={added ? 'add-button added' : 'add-button'} onClick={() => dispatch(addToCart(plant))} disabled={added}>
                        {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to Cart</>}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      <footer className="site-footer"><span><Leaf size={16} /> Paradise Nursery</span><span>Bring home a little more green.</span></footer>
    </main>
  );
}