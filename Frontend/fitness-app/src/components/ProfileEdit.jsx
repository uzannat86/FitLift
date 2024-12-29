import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

function ProfileEdit() {
  const { userData, checkUser } = useAuth();
  const [formData, setFormData] = useState({
    name: userData.name || '',
    phoneNumber: userData.phoneNumber || '',
    email: userData.email || '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    userData.profileImage || null
  );
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('email', formData.email);
    if (profileImage) data.append('profileImage', profileImage);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/user/profile`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await checkUser();
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    )
      return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/profile`, {
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 m-24 bg-white dark:bg-gray-800 shadow-md rounded-md'>
      <h1 className='text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100'>
        Edit Profile
      </h1>

      {successMessage && (
        <div className='bg-green-100 text-green-800 p-2 rounded mb-4 text-center'>
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <ClimbingBoxLoader color='#4A90E2' loading={loading} size={15} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center mb-4'>
            <label
              htmlFor='profileImage'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Profile Image
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Profile Preview'
                className='h-24 w-24 rounded-full object-cover mt-2 border-4'
              />
            )}
            <input
              type='file'
              name='profileImage'
              onChange={handleFileChange}
              accept='image/*'
              className='mt-2 text-sm text-gray-500 dark:text-gray-400'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
              required
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Phone Number
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Phone Number'
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              required
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700'
          >
            Save Changes
          </button>
        </form>
      )}

      <button
        onClick={handleDeleteAccount}
        className='w-full bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700'
      >
        Delete Account
      </button>
    </div>
  );
}

export default ProfileEdit;
