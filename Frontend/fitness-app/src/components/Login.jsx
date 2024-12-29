import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // Import useAuth to access checkUser
import { ClimbingBoxLoader } from 'react-spinners'; // Import the spinner component

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to control loading spinner

  const navigate = useNavigate();
  const { checkUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signIn`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { role } = response.data;
        localStorage.setItem('userRole', role);

        // Call checkUser to update userData in AuthProvider context
        await checkUser();

        // Navigate based on role
        navigate(role === 'Coach' ? '/CoachDash' : '/UserDash');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigateToRegister = () => navigate('/register');
  const handleNavigateToLandingPage = () => navigate('/');

  return (
    <div className='max-w-sm mx-auto mt-10'>
      <p className='text-2xl font-semibold text-center mb-6'>Login</p>

      {/* Conditionally render loading spinner or login form */}
      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <ClimbingBoxLoader color='#4A90E2' loading={loading} size={15} />
        </div>
      ) : (
        <form className='max-w-sm mx-auto' onSubmit={handleLogin}>
          <div className='mb-5'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='Your email'
              required
            />
          </div>

          <div className='mb-5'>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='Your password'
              required
            />
          </div>

          <div className='flex items-start justify-between mb-5'>
            <div className='flex items-center'>
              <input
                id='remember'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
              />
              <label
                htmlFor='remember'
                className='ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
          >
            Login
          </button>
        </form>
      )}

      <div className='my-6 border-t border-gray-300'></div>

      <div className='flex justify-between items-center mb-6'>
        <span className='text-gray-600'>Not a member?</span>
        <button
          onClick={handleNavigateToRegister}
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Create Account
        </button>
      </div>

      <div className='flex justify-center'>
        <button
          onClick={handleNavigateToLandingPage}
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Login;
