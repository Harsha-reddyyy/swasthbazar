import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editVendor = location.state?.vendor || null;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editVendor) {
      setFormData({
        name: editVendor.name || '',
        category: editVendor.category || '',
        phone: editVendor.phone || '',
        email: editVendor.email || '',
        image: editVendor.image || '',
      });
      setImagePreview(editVendor.image || '');
    }
  }, [editVendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append('image', file);

    try {
      const res = await axios.post(
        'https://api.imgbb.com/1/upload?key=753ad367fbd030419ad68a8f3016f49f',
        form
      );
      const url = res.data.data.url;
      setFormData((prev) => ({ ...prev, image: url }));
      setImagePreview(url);
    } catch (error) {
      alert('Image upload failed!');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVendor) {
        const vendorRef = doc(db, 'Vendors', editVendor.id);
        await updateDoc(vendorRef, formData);
        alert('Vendor updated!');
      } else {
        await addDoc(collection(db, 'Vendors'), formData);
        alert('Vendor added!');
      }
      navigate('/vendors');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {editVendor ? '✏️ Edit Vendor' : '➕ Add New Vendor'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Vendor Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Samosa Bhai"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Food Stall"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 9876543210"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. vendor@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-gray-300"
            />
            {uploading && <p className="text-yellow-400 mt-2">Uploading image...</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-md border border-gray-600"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all"
          >
            {editVendor ? 'Update Vendor' : 'Add Vendor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;
