import React from 'react';

function InventoryManager() {
  const [items, setItems] = React.useState([]);
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemAmount, setNewItemAmount] = React.useState('');

  const addItem = () => {
    if (newItemName && newItemAmount) {
      setItems([...items, {
        id: Date.now(),
        name: newItemName,
        amount: parseInt(newItemAmount)
      }]);
      setNewItemName('');
      setNewItemAmount('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="inventory-manager">
      <h2>Manage Inventory</h2>
      
      {/* Add Item Form */}
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={newItemAmount || ''}
          onChange={(e) => setNewItemAmount(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Inventory List */}
      <table className="inventory-list">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, 
amount: parseInt(e.target.value)} : i))}
                />
              </td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save/Load Functionality (Optional for now) */}
      <div className="save-load">
        <button onClick={() => {
          localStorage.setItem('inventory', JSON.stringify(items));
          alert('Inventory saved to local storage!');
        }}>Save Inventory</button>
        <button onClick={() => {
          const savedItems = JSON.parse(localStorage.getItem('inventory')) || [];
          setItems(savedItems);
          alert('Inventory loaded from local storage!');
        }}>Load Inventory</button>
      </div>
    </div>
  );
}

export default InventoryManager;