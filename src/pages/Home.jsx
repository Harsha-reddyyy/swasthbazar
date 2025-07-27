import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* 🌟 Background Glow Effect */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-pink-500 opacity-30 blur-3xl rounded-full z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto p-6 pt-20">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Empowering <span className="text-green-400">Street Vendors</span><br />
            with Smart Solutions 🚀
          </h1>
          <p className="text-gray-300 text-lg">
            SwasthBazar is your all-in-one platform to manage, discover, and support local vendors with ease.
          </p>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/vendors"
              className="border border-gray-400 text-gray-200 px-6 py-3 rounded-md text-lg font-semibold hover:border-green-400 hover:text-green-400 transition"
            >
              View Vendors
            </Link>
          </div>
        </div>

        {/* Glowing Text Banner Instead of Image */}
        <div
          className="w-full lg:w-1/2 mb-10 lg:mb-0 flex items-center justify-center"
          data-aos="fade-left"
        >
          <div className="bg-gradient-to-r from-red-600 via-pink-500 to-yellow-400 text-black font-extrabold text-3xl sm:text-4xl md:text-5xl p-6 rounded-xl shadow-2xl text-center">
            SwasthBazar<br />Empowers Vendors
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16 relative z-10">
        <h2 className="text-center text-3xl font-bold text-white" data-aos="fade-up">
          Why Choose <span className="text-green-400">SwasthBazar</span>?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: "🛒",
              title: "Vendor Management",
              desc: "Easily add, edit, delete and search vendor records.",
            },
            {
              icon: "📊",
              title: "Smart Dashboard",
              desc: "Control all operations from a sleek admin panel.",
            },
            {
              icon: "⚡",
              title: "Real-Time Sync",
              desc: "All updates reflect instantly with Firestore.",
            },
            {
              icon: "📱",
              title: "Mobile Responsive",
              desc: "Designed to work beautifully on all devices.",
            },
            {
              icon: "🌙",
              title: "Dark Mode",
              desc: "Enjoy a sleek interface with dark mode toggle.",
            },
            {
              icon: "📤",
              title: "CSV Export",
              desc: "Download and export vendor lists in one click.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center shadow-lg"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
