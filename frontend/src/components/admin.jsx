import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [editingid, seteditingid] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);

    if (newProduct.image) {
      formData.append('image', newProduct.image); // Only append the image if one is selected
    }

    try {
      if (editingid) {
        // Update existing product
        await axios.put(`http://localhost:5000/admin/${editingid}`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        seteditingid(null);
      } else {
        // Create new product
        const response = await axios.post('http://localhost:5000/admin', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts([...products, response.data]);
      }
      setNewProduct({ name: '', description: '', price: '', image: null });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${id}`, { withCredentials: true });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null, // Reset image to null so user can upload a new one if desired
    });
    seteditingid(id);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button type="submit">{editingid ? 'Update Product' : 'Add Product'}</button>
      </form>

      <ul>
        {Array.isArray(products) ? (
          products.map((item) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} style={{ width: '200px' }} />
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button onClick={() => handleEdit(item._id)}>Edit</button>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
