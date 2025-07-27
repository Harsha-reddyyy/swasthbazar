import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Common nav links
  const publicLinks = [
    { name: 'Home', to: '/' },
    { name: 'Vendors', to: '/vendors' },
    { name: 'Vendor Form', to: '/vendor-form' },
    { name: 'Suppliers', to: '/suppliers' },
  ];

  return (
    <nav className="bg-white dark:bg-[#121212] shadow-md transition-all duration-300 fixed top-0 left-0 w-full z-50 min-h-[64px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-3xl font-extrabold font-montserrat tracking-tight">
            <span className="bg-gradient-to-r from-red-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              Swasth
            </span>
            <span className="text-black dark:text-white">Bazar</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 items-center">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed dark:hover:text-netflixRed transition duration-200"
              >
                {link.name}
              </Link>
            ))}

            {currentUser && (
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed dark:hover:text-netflixRed"
              >
                My Profile
              </Link>
            )}

            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl text-black dark:text-white"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col pb-4 gap-3">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
              >
                {link.name}
              </Link>
            ))}

            {currentUser && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
              >
                My Profile
              </Link>
            )}

            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-netflixRed"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
