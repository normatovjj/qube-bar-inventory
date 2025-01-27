import React, { useState, useEffect } from 'react';

function InventoryManager() {
  const fixedItems = [
    "Paper (reams)",
    "Pens (boxes)",
    "Staplers (units)",
    "Notebooks (units)",
    "Markers (packs)",
    "Sticky Notes (packs)",
    "Paper Clips (boxes)",
    "Folders (units)",
    "Binders (units)",
    "Printer Ink (cartridges)"
  ];

  // Initialize state with localStorage data or zeros for fixed items
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('officeInventory');
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }
    return fixedItems.reduce((acc, item) => ({
      ...acc,
      [item]: 0
    }), {});
  });

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('officeInventory', JSON.stringify(inventory));
  }, [inventory]);

  // Update amount for an item
  const updateAmount = (item, amount) => {
    setInventory({
      ...inventory,
      [item]: parseInt(amount) || 0
    });
  };

  // Reset all amounts to 0
  const resetAmounts = () => {
    const resetInventory = Object.keys(inventory).reduce((acc, item) => ({
      ...acc,
      [item]: 0
    }), {});
    setInventory(resetInventory);
  };

  return (
    <div className="inventory-manager">
      <h2>Office Supply Inventory</h2>
      
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
                      type="number"
                      value={inventory[item]}
                      onChange={(e) => updateAmount(item, e.target.value)}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="save-load">
          <button onClick={resetAmounts}>
            Reset All Amounts
          </button>
          <button onClick={() => {
            localStorage.setItem('officeInventory', JSON.stringify(inventory));
            alert('Inventory saved successfully');
          }}>
            Save Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryManager;