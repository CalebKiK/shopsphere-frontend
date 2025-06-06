// create item.js
import React, { useState } from "react";

const CreateItem = ({ addItemToList }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    price: 0,
    category: "",
    items_available: 0,
    image_url: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.item_name.trim()) validationErrors.item_name = "Item Name is required.";
    if (!formData.description.trim()) validationErrors.description = "Description is required.";
    if (!formData.category.trim()) validationErrors.category = "Category is required.";
    if (!formData.image_url.trim()) validationErrors.image_url = "Image URL is required.";
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      fetch("/api/items_management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newItem) => {
          addItemToList(newItem); // Add the new item to the list
          setFormData({
            item_name: "",
            description: "",
            price: 0,
            category: "",
            items_available: 0,
            image_url: "",
          });
          setErrors({});
        })
        .catch((error) => {
          console.error("There was an error creating the item!", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Item</h2>
      <div>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        {errors.item_name && <span className="error">{errors.item_name}</span>}
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      <div>
        <input
          type="number"
          name="items_available"
          value={formData.items_available}
          onChange={handleChange}
          placeholder="Items Available"
        />
      </div>
      <div>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        {errors.image_url && <span className="error">{errors.image_url}</span>}
      </div>
      <button type="submit">Create Item</button>
    </form>
  );
};

export default CreateItem;