const Sweet = require('../models/sweet');

async function addSweet(name, category, price, quantity) {
  const sweet = new Sweet({
    name,
    category,
    price,
    quantity
  });
  
  await sweet.save();
  return sweet;
}

async function getAllSweets() {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  return sweets;
}

async function searchSweets(filters) {
  const { name, category, minPrice, maxPrice } = filters;
  
  let query = {};
  
  if (name) {
    query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  }
  
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  
  const sweets = await Sweet.find(query);
  return sweets;
}

async function updateSweet(id, updates) {
  const sweet = await Sweet.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );
  
  if (!sweet) {
    throw new Error('Sweet not found');
  }
  
  return sweet;
}

async function deleteSweet(id) {
  const sweet = await Sweet.findByIdAndDelete(id);
  
  if (!sweet) {
    throw new Error('Sweet not found');
  }
  
  return sweet;
}

async function purchaseSweet(id) {
  const sweet = await Sweet.findById(id);
  
  if (!sweet) {
    throw new Error('Sweet not found');
  }
  
  if (sweet.quantity <= 0) {
    throw new Error('Sweet is out of stock');
  }
  
  sweet.quantity -= 1;
  await sweet.save();
  
  return sweet;
}

async function restockSweet(id, amount) {
  const sweet = await Sweet.findById(id);
  
  if (!sweet) {
    throw new Error('Sweet not found');
  }
  
  sweet.quantity += Number(amount);
  await sweet.save();
  
  return sweet;
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