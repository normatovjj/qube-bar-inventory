import React, { useState, useEffect } from 'react';

// Move inventoryItems outside the component
const INVENTORY_ITEMS = {
  drinks: [
    "Mais Dunkel",
    "Mais Alk.Frei",
    "Holsten",
    "Burgunder QbA",
    "Prosecco",
    "Rose",
    "Riesling",
    "Burgunder Neu",
    "Chardonnay",
    "0.25 Classic",
    "0.25 Mittel",
    "0.25 Still",
    "0.75 Classic",
    "0.75 Mittel",
    "0.75 Still",
    "Schweppes Ginger Ale",
    "Schweppes Pink",
    "Maracuja Saft",
    "Mango Saft",
    "Apfel Saft",
    "O-Saft",
    "Kirsche Saft",
    "Aperol",
    "Lillet",
  ],
  tea: [
    "Earl Grey",
    "Darjeeling",
    "Grüner Tee",
    "Pfefferminze",
    "Orancuja",
    "Masala",
  ],
  sirup: [
    "Vanilla",
    "Caramel",
    "Hazelnut",
    "Chocolate",
    "Coconut"
  ]
};

function InventoryManager({ category }) {
  // Initialize state with localStorage data or empty strings for fixed items
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem(`inventory_${category}`);
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }
    return INVENTORY_ITEMS[category].reduce((acc, item) => ({
      ...acc,
      [item]: ''
    }), {});
  });

  // Update inventory when category changes
  useEffect(() => {
    const savedInventory = localStorage.getItem(`inventory_${category}`);
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      setInventory(INVENTORY_ITEMS[category].reduce((acc, item) => ({
        ...acc,
        [item]: ''
      }), {}));
    }
  }, [category]);

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem(`inventory_${category}`, JSON.stringify(inventory));
  }, [inventory, category]);

  const updateAmount = (item, value) => {
    const cleanValue = value.replace(/^0+/, '');
    setInventory({
      ...inventory,
      [item]: cleanValue
    });
  };

  const resetAmounts = () => {
    if (window.confirm(`Are you sure you want to reset all ${category} amounts and notes to zero?`)) {
      const resetInventory = Object.keys(inventory).reduce((acc, item) => ({
        ...acc,
        [item]: ''
      }), {});
      setInventory(resetInventory);
      setComment(''); // Add this line to clear the comment
    }
  };

  const handleKeyPress = (event, currentIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextInput = document.querySelector(`input[data-index="${currentIndex + 1}"]`);
      if (nextInput) {
        // For mobile devices, we need to focus and select in two steps
        setTimeout(() => {
          nextInput.focus();
          // Small delay to ensure focus has happened
          setTimeout(() => {
            nextInput.select();
            // Fallback for iOS
            nextInput.setSelectionRange(0, nextInput.value.length);
          }, 10);
        }, 0);
      } else {
        event.target.blur();
      }
    }
  };

  const [comment, setComment] = useState(() => {
    return localStorage.getItem(`comment_${category}`) || '';
  });
  
  // Add this effect to save comments
  useEffect(() => {
    localStorage.setItem(`comment_${category}`, comment);
  }, [comment, category]);
  
  return (
    <div className="inventory-manager">
      <div className="inventory-content">
        <div className="table-container">
          <table className="inventory-list">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_ITEMS[category].map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="2"
                      value={inventory[item] || ''}
                      onChange={(e) => updateAmount(item, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      data-index={index}
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      <div className="comment-box">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your notes here..."
          rows="4"
        />
      </div>

        <div className="save-load">
          <button className="danger-button" onClick={resetAmounts}>
            Reset {category}
          </button>
          <button onClick={() => {
            localStorage.setItem(`inventory_${category}`, JSON.stringify(inventory));
            alert('Inventory saved successfully');
          }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryManager;