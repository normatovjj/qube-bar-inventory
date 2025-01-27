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
      <h2>Inventory</h2>
      
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemAmount || ''}
          onChange={(e) => setNewItemAmount(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="inventory-list">
          <thead>
            <tr>
              <th>Item</th>
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
                    onChange={(e) => setItems(items.map(i => 
                      i.id === item.id ? {...i, amount: parseInt(e.target.value) || 0} : i
                    ))}
                  />
                </td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="save-load">
        <button onClick={() => {
          localStorage.setItem('inventory', JSON.stringify(items));
          alert('Inventory saved successfully');
        }}>Save Inventory</button>
        <button onClick={() => {
          const savedItems = JSON.parse(localStorage.getItem('inventory')) || [];
          setItems(savedItems);
          alert('Inventory loaded successfully');
        }}>Load Inventory</button>
      </div>
    </div>
  );
}

export default InventoryManager;