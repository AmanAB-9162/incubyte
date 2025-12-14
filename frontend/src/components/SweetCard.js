
import React, { useState } from 'react';
import EditSweetModal from './EditSweetModal';
import './SweetCard.css';

function SweetCard({ sweet, onPurchase, onDelete, onRestock, onUpdate, isAdmin }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handlePurchase = () => {
    onPurchase(sweet._id);
  };

  const handleDelete = () => {
    onDelete(sweet._id);
  };

  const handleRestock = () => {
    onRestock(sweet._id);
  };

  const handleUpdate = () => {
    onUpdate();
    setShowEditModal(false);
  };

  const isOutOfStock = sweet.quantity === 0;

  return (
    <>
      <div className={`sweet-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
        <div className="sweet-header">
          <h3>{sweet.name}</h3>
          <span className="sweet-category">{sweet.category}</span>
        </div>

        <div className="sweet-details">
          <div className="price">
            <span className="label">Price:</span>
            <span className="value">${sweet.price.toFixed(2)}</span>
          </div>
          
          <div className="quantity">
            <span className="label">Stock:</span>
            <span className={`value ${isOutOfStock ? 'stock-zero' : ''}`}>
              {sweet.quantity}
            </span>
          </div>
        </div>

        {isOutOfStock && (
          <div className="stock-badge out">Out of Stock</div>
        )}
        {!isOutOfStock && sweet.quantity <= 10 && (
          <div className="stock-badge low">Low Stock</div>
        )}

        <div className="sweet-actions">
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock}
            className="btn-purchase"
          >
            {isOutOfStock ? 'Out of Stock' : 'Purchase'}
          </button>

          {isAdmin && (
            <div className="admin-actions">
              <button onClick={() => setShowEditModal(true)} className="btn-edit">
                Edit
              </button>
              <button onClick={handleRestock} className="btn-restock">
                Restock
              </button>
              <button onClick={handleDelete} className="btn-delete">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditSweetModal
          sweet={sweet}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default SweetCard;