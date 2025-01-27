import React, { useState, useEffect } from 'react';

function InventoryManager({ category }) {
  const inventoryItems = {
    drinks: [
      "Mais Dunkel",
      "Mais Alk.Frei",
      "Holsten",
      "Burgunder QbA",
      "Proseco"
    ],
    tea: [
      "Earl Grey",
      "Green Tea",
      "Chamomile",
      "English Breakfast",
      "Peppermint"
    ],
    sirup: [
      "Vanilla",
      "Caramel",
      "Hazelnut",
      "Chocolate",
      "Coconut"
    ]
  };

  // Initialize state with localStorage data or empty strings for fixed items
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem(`inventory_${category}`);
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }
    return inventoryItems[category].reduce((acc, item) => ({
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
      setInventory(inventoryItems[category].reduce((acc, item) => ({
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
    if (window.confirm(`Are you sure you want to reset all ${category} amounts to zero?`)) {
      const resetInventory = Object.keys(inventory).reduce((acc, item) => ({
        ...acc,
        [item]: ''
      }), {});
      setInventory(resetInventory);
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
              {inventoryItems[category].map((item, index) => (
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