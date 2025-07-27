import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Add New Vendor',
      description: 'Register a new street vendor to the SwasthBazar database.',
      icon: '➕',
      path: '/vendor-form',
    },
    {
      title: 'View All Vendors',
      description: 'Browse, search, edit, or delete vendors in real-time.',
      icon: '📋',
      path: '/vendors',
    },
    {
      title: 'Analytics (Coming Soon)',
      description: 'Visualize vendor statistics and category breakdowns.',
      icon: '📊',
      path: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          🧠 Admin <span className="text-green-400">Dashboard</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Control your vendor platform with smart tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => feature.path !== '#' && navigate(feature.path)}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold text-white mb-2">{feature.title}</h2>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
