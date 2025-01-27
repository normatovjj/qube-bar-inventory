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

  // Initialize state with localStorage data or empty strings for fixed items
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('officeInventory');
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }
    return fixedItems.reduce((acc, item) => ({
      ...acc,
      [item]: ''  // Initialize with empty string instead of 0
    }), {});
  });

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('officeInventory', JSON.stringify(inventory));
  }, [inventory]);

  // Update amount for an item
  const updateAmount = (item, value) => {
    // Remove leading zeros
    const cleanValue = value.replace(/^0+/, '');
    
    setInventory({
      ...inventory,
      [item]: cleanValue
    });
  };

  // Reset all amounts to empty
  const resetAmounts = () => {
    const resetInventory = Object.keys(inventory).reduce((acc, item) => ({
      ...acc,
      [item]: ''  // Reset to empty string instead of 0
    }), {});
    setInventory(resetInventory);
  };

  // Handle enter key press
  const handleKeyPress = (event, currentIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      // Find the next input element
      const nextInput = document.querySelector(`input[data-index="${currentIndex + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      } else {
        // If we're at the last input, blur the current input to hide keyboard on mobile
        event.target.blur();
      }
    }
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