import React, { useState, useEffect } from 'react';

function InventoryManager() {
  const fixedItems = [
    "Mais Dunkel",
    "Mais Alk.Frei",
    "Holsten",
    "Burgunder QbA",
    "Proseco",
    "Sticky Notes (packs)",
    "Paper Clips (boxes)",
    "Folders (units)",
    "Binders (units)",
    "Printer Ink (cartridges)"
  ];

  // Initialize state with localStorage data or empty strings for fixed items
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('officeInventory');
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }
    return fixedItems.reduce((acc, item) => ({
      ...acc,
      [item]: ''
    }), {});
  });

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('officeInventory', JSON.stringify(inventory));
  }, [inventory]);

  const updateAmount = (item, value) => {
    const cleanValue = value.replace(/^0+/, '');
    setInventory({
      ...inventory,
      [item]: cleanValue
    });
  };

  const resetAmounts = () => {
    if (window.confirm('Are you sure you want to reset all amounts to zero?')) {
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
        nextInput.focus();
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
                <th>Amount in Stock</th>
              </tr>
            </thead>
            <tbody>
              {fixedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="2"
                      value={inventory[item]}
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
            Reset All
          </button>
          <button onClick={() => {
            localStorage.setItem('officeInventory', JSON.stringify(inventory));
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