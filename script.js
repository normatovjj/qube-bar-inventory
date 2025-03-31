// Inventory data
const INVENTORY_ITEMS = {
  drinks: [
    "Mais Dunkel",
    "Mais Alk.Frei",
    "Holsten",
    "Prosecco",
    "Riesling",
    "Burgunder QbA",
    "Rose",
    "Burgunder Neu",
    "Sauvignon Blanc",
    "Chardonnay",
    "0.25 Classic",
    "0.25 Mittel",
    "0.25 Still",
    "0.75 Classic",
    "0.75 Mittel",
    "0.75 Still",
    "Tonic Water",
    "Ginger Ale",
    "Bitter Lemon",
    "Schweppes Ginger Ale",
    "Schweppes Pink",
    "Cola Light 1L",
    "Maracuja Saft",
    "Rhabarber Saft",
    "Mango Saft",
    "Apfel Saft",
    "O-Saft",
    "Bananen Saft",
    "Kirsche Saft",
    "Aperol",
    "Lillet",
    "Sarti",
    "Limoncello"
  ],
  tea: [
    "Earl Grey",
    "Darjeeling",
    "Grüner Tee",
    "Pfefferminze",
    "Orancuja",
    "Masala"
  ],
  sirup: [
    "Vanilla",
    "Caramel",
    "Hazelnut",
    "Chocolate",
    "Coconut"
  ]
};

// DOM Elements
const menuButton = document.getElementById('menuButton');
const menuOverlay = document.getElementById('menuOverlay');
const menuCard = document.getElementById('menuCard');
const inventoryTableBody = document.getElementById('inventoryTableBody');
const commentBox = document.getElementById('commentBox');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');
const categoryName = document.getElementById('categoryName');

// State
let currentCategory = 'drinks';
let inventory = {};

// Initialize the app
function init() {
  // Load data from localStorage
  loadInventory();
  loadComment();
  updateCategoryName();
  renderInventoryTable();
  
  // Set up event listeners
  setupEventListeners();
}

// Load inventory from localStorage
function loadInventory() {
  const savedInventory = localStorage.getItem(`inventory_${currentCategory}`);
  if (savedInventory) {
    inventory = JSON.parse(savedInventory);
  } else {
    // Initialize with empty values
    inventory = INVENTORY_ITEMS[currentCategory].reduce((acc, item) => {
      acc[item] = '';
      return acc;
    }, {});
  }
}

// Load comment from localStorage
function loadComment() {
  const savedComment = localStorage.getItem(`comment_${currentCategory}`);
  commentBox.value = savedComment || '';
}

// Update category name in reset button
function updateCategoryName() {
  categoryName.textContent = currentCategory;
}

// Render inventory table
function renderInventoryTable() {
  inventoryTableBody.innerHTML = '';
  
  INVENTORY_ITEMS[currentCategory].forEach((item, index) => {
    const tr = document.createElement('tr');
    
    const itemTd = document.createElement('td');
    itemTd.textContent = item;
    
    const amountTd = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'tel';
    input.inputMode = 'numeric';
    input.pattern = '[0-9]*';
    input.maxLength = 2;
    input.value = inventory[item] || '';
    input.placeholder = '0';
    input.dataset.index = index;
    input.dataset.item = item;
    
    // Add event listeners for input
    input.addEventListener('input', (e) => {
      const value = e.target.value.replace(/^0+/, '');
      updateAmount(item, value);
    });
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) {
          setTimeout(() => {
            nextInput.focus();
            setTimeout(() => {
              nextInput.select();
              nextInput.setSelectionRange(0, nextInput.value.length);
            }, 10);
          }, 0);
        } else {
          e.target.blur();
        }
      }
    });
    
    amountTd.appendChild(input);
    tr.appendChild(itemTd);
    tr.appendChild(amountTd);
    inventoryTableBody.appendChild(tr);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Menu button toggle
  menuButton.addEventListener('click', toggleMenu);
  
  // Close menu when clicking outside
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });
  
  // Category buttons
  document.querySelectorAll('.menu-card button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      changeCategory(category);
    });
  });
  
  // Comment box
  commentBox.addEventListener('input', saveComment);
  
  // Reset button
  resetButton.addEventListener('click', resetAmounts);
  
  // Save button
  saveButton.addEventListener('click', () => {
    saveInventory();
    alert('Inventory saved successfully');
  });
}

// Toggle menu
function toggleMenu() {
  menuButton.classList.toggle('open');
  menuOverlay.classList.toggle('open');
}

// Close menu
function closeMenu() {
  menuButton.classList.remove('open');
  menuOverlay.classList.remove('open');
}

// Change category
function changeCategory(category) {
  // Save current inventory and comment
  saveInventory();
  saveComment();
  
  // Update active button
  document.querySelectorAll('.menu-card button').forEach(button => {
    button.classList.toggle('active', button.dataset.category === category);
  });
  
  // Switch category
  currentCategory = category;
  
  // Load new category data
  loadInventory();
  loadComment();
  updateCategoryName();
  renderInventoryTable();
  
  // Close menu
  closeMenu();
}

// Update amount
function updateAmount(item, value) {
  inventory[item] = value;
  saveInventory();
}

// Save inventory to localStorage
function saveInventory() {
  localStorage.setItem(`inventory_${currentCategory}`, JSON.stringify(inventory));
}

// Save comment to localStorage
function saveComment() {
  localStorage.setItem(`comment_${currentCategory}`, commentBox.value);
}

// Reset amounts
function resetAmounts() {
  if (window.confirm(`Are you sure you want to reset all ${currentCategory} amounts and notes to zero?`)) {
    inventory = INVENTORY_ITEMS[currentCategory].reduce((acc, item) => {
      acc[item] = '';
      return acc;
    }, {});
    
    commentBox.value = '';
    
    saveInventory();
    saveComment();
    renderInventoryTable();
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);