import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Shopimages.css';

const Shopimages = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { categoryName: '', subtypes: [{ name: '', price: '', images: [] }] },
  ]);

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { categoryName: '', subtypes: [{ name: '', price: '', images: [] }] },
    ]);
  };

  const handleAddSubtype = (catIndex) => {
    const updated = [...categories];
    updated[catIndex].subtypes.push({ name: '', price: '', images: [] });
    setCategories(updated);
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].categoryName = value;
    setCategories(updated);
  };

  const handleSubtypeChange = (catIndex, subIndex, field, value) => {
    const updated = [...categories];
    updated[catIndex].subtypes[subIndex][field] = value;
    setCategories(updated);
  };

  const handleImageUpload = (catIndex, subIndex, files) => {
    const updated = [...categories];
    updated[catIndex].subtypes[subIndex].images = files;
    setCategories(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('shopId', shopId);

    const metadata = categories.map((cat, catIndex) => ({
      categoryName: cat.categoryName,
      subtypes: cat.subtypes.map((sub, subIndex) => ({
        name: sub.name,
        price: Number(sub.price),
        imageField: `images_cat${catIndex}_sub${subIndex}`,
      })),
    }));

    formData.append('categories', JSON.stringify(metadata));

    categories.forEach((cat, catIndex) => {
      cat.subtypes.forEach((sub, subIndex) => {
        const fieldName = `images_cat${catIndex}_sub${subIndex}`;
        if (sub.images && sub.images.length > 0) {
          Array.from(sub.images).forEach((file) => {
            formData.append(fieldName, file);
          });
        }
      });
    });

    try {
      await axios.post(
        'http://localhost:5000/api/fabrics/add-multiple-categories',
        formData
      );
      alert('✅ Categories added successfully!');
      navigate('/shop-cards');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(`❌ Failed to add categories: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="shopimages-container">
      <h1 className="title">Add Fabric Categories</h1>
      <form onSubmit={handleSubmit} className="shopimages-form">
        <input type="text" className="readonly-input" value={shopId} readOnly />

        {categories.map((category, catIndex) => (
          <div key={catIndex} className="category-card">
            <input
              type="text"
              placeholder="Category Name"
              className="input"
              value={category.categoryName}
              onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
              required
            />
            <h3 className="subtitle">Subtypes:</h3>
            {category.subtypes.map((subtype, subIndex) => (
              <div key={subIndex} className="subtype-row">
                <input
                  type="text"
                  placeholder="Subtype Name"
                  className="input"
                  value={subtype.name}
                  onChange={(e) =>
                    handleSubtypeChange(catIndex, subIndex, 'name', e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="input"
                  value={subtype.price}
                  onChange={(e) =>
                    handleSubtypeChange(catIndex, subIndex, 'price', e.target.value)
                  }
                  required
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input"
                  onChange={(e) => handleImageUpload(catIndex, subIndex, e.target.files)}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddSubtype(catIndex)}
            >
              ➕ Add Subtype
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-success" onClick={handleAddCategory}>
          ➕ Add Category
        </button>

        <button type="submit" className="btn btn-primary">
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default Shopimages;
