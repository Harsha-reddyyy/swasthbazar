import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const Suppliers = () => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    category: "",
    phone: "",
    email: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers from Firestore on mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      const snapshot = await getDocs(collection(db, "Suppliers"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setSupplierData({ ...supplierData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Suppliers"), {
        ...supplierData,
        createdAt: serverTimestamp(),
      });

      // Clear the form
      setSupplierData({ name: "", category: "", phone: "", email: "" });

      // Refresh the supplier list
      const snapshot = await getDocs(collection(db, "Suppliers"));
      const updatedSuppliers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(updatedSuppliers);
    } catch (err) {
      console.error("Error adding supplier:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          📦 Supplier Submission
        </h1>

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={supplierData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={supplierData.category}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={supplierData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={supplierData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded text-white font-semibold"
          >
            Submit Supplier
          </button>
        </form>

        {/* Supplier List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📋 Submitted Suppliers</h2>
          {suppliers.length === 0 ? (
            <p className="text-gray-400">No suppliers added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md"
                >
                  <h3 className="text-xl font-semibold text-green-400">
                    {supplier.name}
                  </h3>
                  <p>📦 {supplier.category}</p>
                  {supplier.phone && <p>📞 {supplier.phone}</p>}
                  {supplier.email && <p>📧 {supplier.email}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
