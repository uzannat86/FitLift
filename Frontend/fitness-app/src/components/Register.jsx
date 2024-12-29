import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners'; // Import the spinner component

function Register() {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  });

  // State to hold error messages and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to control loading spinner
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const data = new FormData();
      data.append('name', `${formData.firstName} ${formData.lastName}`);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('phoneNumber', formData.phone);
      data.append('role', formData.role);
      if (profileImage) data.append('profileImage', profileImage);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signUp`,
        data,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 201) {
        const { role } = response.data;
        navigate(role === 'Coach' ? '/CoachDash' : '/UserDash');
      }
    } catch (error) {
      setError(
        error.response?.data?.error || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleNavigateToLandingPage = () => {
    navigate('/');
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <p className='text-2xl font-semibold text-center mb-6'>Sign Up</p>

      {error && (
        <div
          className='bg-red-100 text-red-700 px-4 py-3 rounded mb-4'
          role='alert'
        >
          {error}
        </div>
      )}

      {/* Conditionally render loading spinner or registration form */}
      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <ClimbingBoxLoader color='#4A90E2' loading={loading} size={15} />
        </div>
      ) : (
        <form
          className='max-w-md mx-auto'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
              placeholder='Email'
              required
            />
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
              placeholder='Password'
              required
            />
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
              placeholder='Confirm Password'
              required
            />
          </div>

          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
                placeholder='First Name'
                required
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
                placeholder='Last Name'
              />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer'
                placeholder='Phone Number (123-456-7890)'
                required
              />
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <select
                id='role'
                value={formData.role}
                onChange={handleRoleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 peer'
                required
              >
                <option value='' disabled>
                  Choose a role
                </option>
                <option value='Coach'>Coach</option>
                <option value='Client'>Client</option>
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
          >
            Sign Up
          </button>
        </form>
      )}

      <div className='my-6 border-t border-gray-300'></div>

      <div className='flex justify-between items-center mb-6'>
        <span className='text-gray-600'>Already have an account?</span>
        <button
          onClick={() => navigate('/login')}
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Login
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

export default Register;
