// Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const userRole = localStorage.getItem('userRole');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update the handleProfileClick function
  const handleProfileClick = () => {
    navigate('/profile'); // Changed to "/profile"
  };

  return (
    <div className='navbar bg-base-100'>
      {/* Logo/Title */}
      <div className='flex-1'>
        <button
          onClick={() =>
            navigate(userRole === 'Coach' ? '/CoachDash' : '/UserDash')
          }
          className='btn btn-ghost normal-case text-xl'
        >
          AnotherFitnessApp
        </button>
      </div>

      {/* Dark Mode Toggle & Profile */}
      <div className='flex-none gap-2'>
        {/* Dark Mode Toggle Button */}
        <label className='swap swap-rotate'>
          <input
            type='checkbox'
            onClick={toggleDarkMode}
            style={{ display: 'none' }}
          />
          {/* Sun icon */}
          <svg
            className='swap-on h-11 w-11 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
          </svg>

          {/* Moon icon */}
          <svg
            className='swap-off h-11 w-11 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
          </svg>
        </label>

        {/* Profile Avatar Dropdown */}
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full border-4 border-gray-400'>
              <img
                alt='Avatar'
                src={userData.profileImage || 'favicon.svg'}
                className='w-10 h-10'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/profile/edit'>
                Settings
                <span className='badge'>New</span>
              </Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
