// import React, { useState } from 'react';
// import './SearchBar.css';

// function SearchBar({ onSearch, onClear }) {
//   const [searchParams, setSearchParams] = useState({
//     name: '',
//     category: '',
//     minPrice: '',
//     maxPrice: ''
//   });

//   const handleChange = (e) => {
//     setSearchParams({
//       ...searchParams,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Create search object with only filled fields
//     const params = {};
//     if (searchParams.name) params.name = searchParams.name;
//     if (searchParams.category) params.category = searchParams.category;
//     if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
//     if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;
    
//     onSearch(params);
//   };

//   const handleClear = () => {
//     setSearchParams({
//       name: '',
//       category: '',
//       minPrice: '',
//       maxPrice: ''
//     });
//     onClear();
//   };

//   return (
//     <div className="search-bar">
//       <form onSubmit={handleSubmit} className="search-form">
//         <div className="search-inputs">
//           <input
//             type="text"
//             name="name"
//             value={searchParams.name}
//             onChange={handleChange}
//             placeholder="Search by name..."
//             className="search-input"
//           />
          
//           <input
//             type="text"
//             name="category"
//             value={searchParams.category}
//             onChange={handleChange}
//             placeholder="Category..."
//             className="search-input"
//           />
          
//           <input
//             type="number"
//             name="minPrice"
//             value={searchParams.minPrice}
//             onChange={handleChange}
//             placeholder="Min Price"
//             step="0.01"
//             min="0"
//             className="search-input price-input"
//           />
          
//           <input
//             type="number"
//             name="maxPrice"
//             value={searchParams.maxPrice}
//             onChange={handleChange}
//             placeholder="Max Price"
//             step="0.01"
//             min="0"
//             className="search-input price-input"
//           />
//         </div>

//         <div className="search-buttons">
//           <button type="submit" className="btn-search">
//             Search
//           </button>
//           <button type="button" onClick={handleClear} className="btn-clear">
//             Clear
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SearchBar;

import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onClear }) {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const params = {};
    if (searchParams.name) params.name = searchParams.name;
    if (searchParams.category) params.category = searchParams.category;
    if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
    if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;
    
    onSearch(params);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    onClear();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-inputs">
          <input
            type="text"
            name="name"
            value={searchParams.name}
            onChange={handleChange}
            placeholder="Search by name..."
            className="search-input"
          />
          
          <input
            type="text"
            name="category"
            value={searchParams.category}
            onChange={handleChange}
            placeholder="Category..."
            className="search-input"
          />
          
          <input
            type="number"
            name="minPrice"
            value={searchParams.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            step="0.01"
            min="0"
            className="search-input price-input"
          />
          
          <input
            type="number"
            name="maxPrice"
            value={searchParams.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            step="0.01"
            min="0"
            className="search-input price-input"
          />
        </div>

        <div className="search-buttons">
          <button type="submit" className="btn-search">
            Search
          </button>
          <button type="button" onClick={handleClear} className="btn-clear">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;