// import React, { useState } from 'react';
// import { sweetsAPI } from '../services/api';
// import './Modal.css';

// function EditSweetModal({ sweet, onClose, onUpdate }) {
//   const [formData, setFormData] = useState({
//     name: sweet.name,
//     category: sweet.category,
//     price: sweet.price,
//     quantity: sweet.quantity
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (!formData.name || !formData.category || !formData.price || formData.quantity === '') {
//       setError('All fields are required');
//       return;
//     }

//     if (formData.price <= 0 || formData.quantity < 0) {
//       setError('Price must be positive and quantity cannot be negative');
//       return;
//     }

//     setLoading(true);

//     try {
//       await sweetsAPI.update(sweet._id, {
//         name: formData.name,
//         category: formData.category,
//         price: parseFloat(formData.price),
//         quantity: parseInt(formData.quantity)
//       });

//       onUpdate(); // Callback to refresh list
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to update sweet');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Edit Sweet</h2>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Sweet Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={loading}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Category</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               disabled={loading}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Price ($)</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               step="0.01"
//               min="0"
//               disabled={loading}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               min="0"
//               disabled={loading}
//               required
//             />
//           </div>

//           <div className="modal-actions">
//             <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? 'Updating...' : 'Update Sweet'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditSweetModal;






import React, { useState } from 'react';
import { sweetsAPI } from '../services/api';
import './Modal.css';

function EditSweetModal({ sweet, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.category || !formData.price || formData.quantity === '') {
      setError('All fields are required');
      return;
    }

    if (formData.price <= 0 || formData.quantity < 0) {
      setError('Price must be positive and quantity cannot be negative');
      return;
    }

    setLoading(true);

    try {
      await sweetsAPI.update(sweet._id, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });

      onUpdate();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update sweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Sweet</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sweet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              disabled={loading}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSweetModal;