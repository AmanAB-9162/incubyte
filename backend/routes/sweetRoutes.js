const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.post('/', authenticateToken, sweetController.addSweet);
router.get('/', authenticateToken, sweetController.getAllSweets);
router.get('/search', authenticateToken, sweetController.searchSweets);
router.put('/:id', authenticateToken, sweetController.updateSweet);
router.delete('/:id', authenticateToken, isAdmin, sweetController.deleteSweet);
router.post('/:id/purchase', authenticateToken, sweetController.purchaseSweet);
router.post('/:id/restock', authenticateToken, isAdmin, sweetController.restockSweet);

module.exports = router;