import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTrash, FaEdit, FaFileExport } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Vendors"), (snapshot) => {
      const vendorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVendors(vendorData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vendor?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Vendors", id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleEdit = (vendor) => {
    navigate("/vendor-form", { state: { vendor } });
  };

  const handleExport = () => {
    const csvHeader = ["Name", "Category", "Phone", "Email"];
    const rows = vendors.map((vendor) => [
      vendor.name || "",
      vendor.category || "",
      vendor.phone || "",
      vendor.email || "",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vendors_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold">🛒 Vendors</h1>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            {currentUser && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                <FaFileExport /> Export CSV
              </button>
            )}
          </div>
        </div>

        {filteredVendors.length === 0 ? (
          <p className="text-center text-gray-400">No vendors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor, index) => (
              <div
                key={vendor.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow hover:shadow-2xl transition"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h2 className="text-xl font-semibold text-green-400 mb-2">
                  {vendor.name || "Unnamed Vendor"}
                </h2>
                <p className="text-gray-300">📦 Category: {vendor.category || "N/A"}</p>
                <p className="text-gray-300">📞 Phone: {vendor.phone || "N/A"}</p>
                <p className="text-gray-300">📧 Email: {vendor.email || "N/A"}</p>

                {vendor.image && (
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="mt-3 rounded-md h-40 object-cover w-full border border-gray-700"
                  />
                )}

                {currentUser && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vendor.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
