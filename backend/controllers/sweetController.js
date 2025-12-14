const sweetService = require('../services/sweetService');




//Add Sweets
async function addSweet(req, res) {
  try {
    const { name, category, price, quantity } = req.body;
    
    // Validation
    if (!name || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (price < 0 || quantity < 0) {
      return res.status(400).json({ error: 'Price and quantity must be positive' });
    }
    
    const sweet = await sweetService.addSweet(name, category, price, quantity);
    
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


//All Sweet
async function getAllSweets(req, res) {
  try {
    const sweets = await sweetService.getAllSweets();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


//Search Sweet
async function searchSweets(req, res) {
  try {
    const filters = req.query;
    const sweets = await sweetService.searchSweets(filters);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


//Update Sweet
async function updateSweet(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const sweet = await sweetService.updateSweet(id, updates);
    res.status(200).json(sweet);
  } catch (error) {
    if (error.message === 'Sweet not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

//Delete Sweet
async function deleteSweet(req, res) {
  try {
    const { id } = req.params;
    await sweetService.deleteSweet(id);
    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    if (error.message === 'Sweet not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}


//Purchase Sweet
async function purchaseSweet(req, res) {
  try {
    const { id } = req.params;
    const sweet = await sweetService.purchaseSweet(id);
    res.status(200).json(sweet);
  } catch (error) {
    if (error.message === 'Sweet not found' || error.message === 'Sweet is out of stock') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

//Restock Sweet
async function restockSweet(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }
    
    const sweet = await sweetService.restockSweet(id, amount);
    res.status(200).json(sweet);
  } catch (error) {
    if (error.message === 'Sweet not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};