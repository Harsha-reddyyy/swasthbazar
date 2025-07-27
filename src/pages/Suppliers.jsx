// src/pages/Suppliers.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Suppliers = () => {
  const [formData, setFormData] = useState({
    name: "",
    product: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.product || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "Suppliers"), formData);
      alert("Supplier submitted successfully!");
      setFormData({ name: "", product: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error submitting supplier:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
      <div
        className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
          🔗 Submit Supplier Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Supplier Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Eg: Rama Traders"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Product / Category *</label>
            <input
              type="text"
              name="product"
              placeholder="Eg: Vegetables, Rice, Utensils"
              value={formData.product}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Eg: 9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email (optional)</label>
            <input
              type="email"
              name="email"
              placeholder="Eg: supplier@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold text-lg transition"
          >
            {loading ? "Submitting..." : "Submit Supplier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Suppliers;
