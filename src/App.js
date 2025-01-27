import React, { useState, useEffect, useRef } from 'react';
import InventoryManager from './InventoryManager';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('drinks');
  const menuRef = useRef();

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  // Handle clicks anywhere when menu is open
  useEffect(() => {
    const handleClick = (event) => {
      if (menuOpen && (!menuRef.current || !menuRef.current.contains(event.target))) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [menuOpen]);

  return (
    <div className="app">
      <div className="header">
        <h1>Bar Inventory</h1>
        <button 
          className={`menu-button ${menuOpen ? 'open' : ''}`}
          onClick={openMenu}
        >
          <div className="menu-button-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu-card" ref={menuRef}>
          <button 
            className={currentCategory === 'drinks' ? 'active' : ''} 
            onClick={() => handleCategoryChange('drinks')}
          >
            Drinks
          </button>
          <button 
            className={currentCategory === 'tea' ? 'active' : ''} 
            onClick={() => handleCategoryChange('tea')}
          >
            Tea
          </button>
          <button 
            className={currentCategory === 'sirup' ? 'active' : ''} 
            onClick={() => handleCategoryChange('sirup')}
          >
            Monin Sirup
          </button>
        </div>
      </div>

      <InventoryManager category={currentCategory} />
    </div>
  );
}

export default App;